/**
 * This is a slightly modified version of sequential-task-queue by BalassaMarton.
 * Original repo: https://github.com/BalassaMarton/sequential-task-queue
 */

import {
    QueueSystemScheduler,
    QueueSystemTaskOptions,
    QueueSystemTaskEntry,
    QueueSystemCancellablePromiseLike,
    QueueSystemSequentialTaskQueueOptions
} from "../../../types";

export let cancellationTokenReasons = {
    cancel: "Background queue has been cancelled.",
    timeout: "Background queue has timed out."
};

export let sequentialTaskQueueEvents = {
    drained: "drained",
    error: "error",
    timeout: "timeout"
};

if (typeof window.queueMicrotask !== "function") {
    window.queueMicrotask = (callback: any) => {
        Promise.resolve()
            .then(callback)
            .catch(e =>
                setTimeout(() => {
                    throw e;
                })
            );
    };
}

export default class SequentialTaskQueue {
    public completed: any[] = [];
    public failed: QueueSystemTaskEntry[] = [];
    private queue: QueueSystemTaskEntry[] = [];
    private _isClosed: boolean = false;
    private waiters: Function[] = [];
    private defaultTimeout: number = 300;
    private currentTask: QueueSystemTaskEntry | undefined;
    private scheduler: QueueSystemScheduler;
    private events: { [key: string]: Function[] } = {};

    name: string;

    get isClosed() {
        return this._isClosed;
    }

    constructor(options?: QueueSystemSequentialTaskQueueOptions) {
        if (!options) options = {};
        this.defaultTimeout = options.timeout || this.defaultTimeout;
        this.name = "queue-system";
        this.scheduler = {
            schedule: callback => window.queueMicrotask(callback)
        };
        // this.scheduler = {
        //     schedule: callback => Promise.resolve().then(() => callback())
        // };
        // this.scheduler = {
        //     schedule: callback =>
        //         setTimeout(<(...args: any[]) => void>callback, 0)
        // };
    }

    push(
        name: string,
        task: Function,
        options?: QueueSystemTaskOptions
    ): Promise<any> {
        console.log("added task " + name, task);
        if (this._isClosed)
            throw new Error(`${this.name} has been previously closed`);
        let taskEntry: QueueSystemTaskEntry = {
            name,
            callback: task,
            args:
                options && options.args
                    ? Array.isArray(options.args)
                        ? options.args.slice()
                        : [options.args]
                    : [],
            timeout:
                options && options.timeout !== undefined
                    ? options.timeout
                    : this.defaultTimeout,
            cancellationToken: {
                cancel: (reason?) => this.cancelTask(taskEntry, reason)
            },
            resolve: undefined,
            reject: undefined
        };
        taskEntry.args.push(taskEntry.cancellationToken);
        this.queue.push(taskEntry);
        console.log("before next!");
        this.scheduler.schedule(() => this.next());
        let result = (new Promise((resolve, reject) => {
            taskEntry.resolve = resolve;
            taskEntry.reject = reject;
        }) as any) as QueueSystemCancellablePromiseLike<any>;
        result.cancel = (reason?: any) =>
            taskEntry.cancellationToken.cancel(reason);

        return this.wait();
    }

    cancel(): PromiseLike<any> {
        if (this.currentTask)
            this.cancelTask(this.currentTask, cancellationTokenReasons.cancel);
        const queue = this.queue.splice(0);
        // Cancel all and emit a drained event if there were tasks waiting in the queue
        if (queue.length) {
            queue.forEach(task =>
                this.cancelTask(task, cancellationTokenReasons.cancel)
            );
            this.emit(sequentialTaskQueueEvents.drained);
        }
        return this.wait();
    }

    close(cancel?: boolean): PromiseLike<any> {
        if (!this._isClosed) {
            this._isClosed = true;
            if (cancel) return this.cancel();
        }
        return this.wait();
    }

    wait(): Promise<any> {
        if (!this.currentTask && this.queue.length === 0)
            return Promise.resolve();
        return new Promise(resolve => {
            this.waiters.push(resolve);
        });
    }

    on(evt: string, handler: Function) {
        this.events = this.events || {};
        (this.events[evt] || (this.events[evt] = [])).push(handler);
    }

    once(evt: string, handler: Function) {
        const cb = (...args: any[]) => {
            this.removeListener(evt, cb);
            handler.apply(this, args);
        };
        this.on(evt, cb);
    }

    removeListener(evt: string, handler: Function) {
        if (this.events) {
            let list = this.events[evt];
            if (list) {
                let i = 0;
                while (i < list.length) {
                    if (list[i] === handler) list.splice(i, 1);
                    else i++;
                }
            }
        }
    }

    off(evt: string, handler: Function) {
        return this.removeListener(evt, handler);
    }

    protected emit(evt: string, ...args: any[]) {
        if (this.events && this.events[evt])
            try {
                this.events[evt].forEach(fn => fn.apply(this, args));
            } catch (e) {
                console.error(
                    `${this.name}: Exception in '${evt}' event handler`,
                    e
                );
            }
    }

    protected next() {
        console.log("in next...");
        if (!this.currentTask) {
            let task = this.queue.shift();
            console.log("processing task...", task);
            while (task && task.cancellationToken.cancelled)
                task = this.queue.shift();
            if (task) {
                try {
                    this.currentTask = task;
                    if (task.timeout) {
                        task.timeoutHandle = setTimeout(() => {
                            this.emit(sequentialTaskQueueEvents.timeout);
                            this.cancelTask(
                                task!,
                                `The task took longer than ${task?.timeout}ms and timed out in ${task?.name}.`
                            );
                        }, task.timeout);
                    }
                    let res = task.callback.apply(undefined, task.args);
                    if (res && isPromise(res)) {
                        res.then(
                            result => {
                                task!.result = result;
                                this.doneTask(task!);
                            },
                            err => {
                                this.doneTask(task!, err || "Task failed.");
                            }
                        );
                    } else {
                        task.result = res;
                        this.doneTask(task);
                    }
                } catch (e) {
                    this.doneTask(task, e);
                }
            } else {
                this.callWaiters();
            }
        }
    }

    private cancelTask(task: QueueSystemTaskEntry, reason?: any) {
        task.cancellationToken.cancelled = true;
        task.cancellationToken.reason = reason;

        this.doneTask(task);
    }

    private doneTask(task: QueueSystemTaskEntry, error?: any) {
        console.log("done task...", task);
        if (task.timeoutHandle) clearTimeout(task.timeoutHandle);
        task.cancellationToken.cancel = noop;
        if (error) {
            this.emit(sequentialTaskQueueEvents.error, error);
            task.reject?.call(undefined, error);
            this.failed.push(task);
        } else if (task.cancellationToken.cancelled) {
            task.reject?.call(undefined, task.cancellationToken.reason);
        } else task.resolve?.call(undefined, task.result);

        if (this.currentTask === task) {
            this.currentTask = undefined;
            if (task.result) {
                this.completed.push(task.result);
            } else {
                this.failed.push(task);
            }

            if (!this.queue.length) {
                this.emit(sequentialTaskQueueEvents.drained);
                this.callWaiters();
            } else this.scheduler.schedule(() => this.next());
        }
    }

    private callWaiters() {
        let waiters = this.waiters.splice(0);
        waiters.forEach(waiter => waiter());
    }
}

function noop() {}

function isPromise(obj: any): obj is PromiseLike<any> {
    return obj && typeof obj.then === "function";
}
