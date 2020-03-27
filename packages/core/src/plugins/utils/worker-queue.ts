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
  currentTask: null,
  complete: [],
  errors: [],
  queue: [],
  awaiters: [],
  async push(cb: any): Promise<void> {
    this.queue.push(cb);

    enqueue(this.next.bind(this));

    return this.wait();
  },
  async next(): Promise<void> {
    if (!this.currentTask) {
      const task = this.queue.shift();
      try {
        if (task) {
          this.currentTask = task;
          const complete = await this.currentTask;
          this.complete.push(complete);
          this.currentTask = undefined;

          if (this.queue.length) {
            enqueue(this.next.bind(this));
          } else this.callAWaiters();
        } else {
          this.callAWaiters();
        }
      } catch (e) {
        this.errors.push(e);
      }
    }
  },
  callAWaiters() {
    this.awaiters.splice(0).forEach(awaiter => awaiter());
  },
  wait() {
    if (!this.queue.length) {
      return Promise.resolve();
    }
    return new Promise(resolve => this.awaiters.push(resolve));
  }
});

export default workerQueue;
