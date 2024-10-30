class PriorityQueue {
  constructor(size, sorter) {
    this._queue = [];
    this._size = size;
    this._sorter = sorter;
  }
  isEmpty() {
    return this._queue.length === 0;
  }
  push(value) {
    this._queue.push(value);
    this.sorter(this._queue);
    if (this._queue.length > this._size) {
      this._queue.length = this._size;
    }
    return value;
  }
  pop() {
    return this._queue.shift();
  }
}