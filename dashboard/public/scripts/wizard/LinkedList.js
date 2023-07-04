import Node from './Node.js';

export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.listLenght = 0;
  }
  add(element) {
    let node = new Node(element);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.previous = this.tail;
      this.tail.next = node;
      this.tail = node;
    }

    this.listLenght++;
  }
}
