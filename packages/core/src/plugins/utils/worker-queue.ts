import { WorkerQueue } from "../../../types";

let enqueue: any = queueMicrotask;
if (typeof enqueue !== "function") {
    enqueue = (callback: any) =>
        Promise.resolve()
            .then(callback)
            .catch(e =>
                setTimeout(() => {
                    throw e;
                })
            );
}

const workerQueue = (): WorkerQueue => ({
    complete: [],
    errors: [],
    queue: [],
    awaiters: [],
    async push(cb: any): Promise<void> {
        this.queue.push(cb);

        enqueue(this.next.bind(this));

        return new Promise(resolve => {
            this.awaiters.push(resolve);
        });
    },
    async next(): Promise<void> {
        try {
            const currentTask = await this.queue.shift();
            if (currentTask) {
                this.complete.push(currentTask);
            }
        } catch (e) {
            this.errors.push(e);
        }

        if (this.queue.length) {
            enqueue(this.next.bind(this));
        } else this.callAWaiters();
    },
    callAWaiters() {
        this.awaiters.splice(0).forEach(awaiter => awaiter());
    }
});

export default workerQueue;
