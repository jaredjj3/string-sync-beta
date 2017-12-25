// Linked list structure to make iterating through them easier.
class Measure {
  vextabString: string = '';
  vextabOptions: string = '';
  vextabOptionsId: number = -1;
  prev: Measure = null;
  next: Measure = null;

  constructor(vextabString: string, vextabOptions: string, vextabOptionsId: number) {
    this.vextabString = vextabString;
    this.vextabOptions = vextabOptions;
    this.vextabOptionsId = vextabOptionsId;
  }

  setPrev(prev: Measure): Measure {
    this.prev = prev;

    if (prev) {
      prev.next = this;
    }

    return prev;
  }

  setNext(next: Measure): Measure {
    next.setPrev(this);
    return next;
  }
}

export default Measure;
