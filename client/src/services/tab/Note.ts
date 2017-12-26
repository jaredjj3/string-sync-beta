class Note {
  number: number = 0;
  prev: Note = null;
  next: Note = null;

  setPrev(prev: Note): Note {
    this.prev = prev;

    if (prev) {
      prev.next = this;
    }

    return prev;
  }

  setNext(next: Note): Note {

    return next;
  }
}

export default Note;
