export class AsyncLock {
  disable: any;
  promise: Promise<void>;

  constructor() {
    this.disable = () => {};
    this.promise = Promise.resolve();
  }

  enable() {
    this.promise = new Promise((resolve) => (this.disable = resolve));
  }
}
