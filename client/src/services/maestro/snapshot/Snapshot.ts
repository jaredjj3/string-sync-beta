class Snapshot {
  data: SnapshotData = {
    maestro: {
      tick: -1,
      timeMs: -1
    },
    score: {
      line: null,
      measure: null,
      note: null
    },
    fretboard: {
      lightGuitarPositions: [],
      justPressGuitarPositions: [],
      pressGuitarPositions: [],
      suggestGuitarPositions: []
    },
    loop: {
      notes: [null, null],
      tickRange: [0, 0],
      changed: [false, false],
      isScrubbing: false
    },
    focused: {
      line: null
    }
  }

  prev: Snapshot = null;

  private _createdAt: number = -1;
  private _snapshotAt: number = -1;

  constructor(prev: Snapshot = null) {
    // Consumers of this class will not have a need to go back more than one
    // prev, so unset prev's prev to avoid having a linked list behavior, 
    // ultimately avoiding memory leaks
    if (prev) {
      prev.prev = null;
    }

    this.prev = prev;
    this._createdAt = Date.now();
  }

  setData(data: SnapshotData): SnapshotData {
    const maestro = Object.freeze(Object.assign({}, this.data.maestro, data.maestro));
    const score = Object.freeze(Object.assign({}, this.data.score, data.score));
    const fretboard = Object.freeze(Object.assign({}, this.data.fretboard, data.fretboard));
    const loop = Object.freeze(Object.assign({}, this.data.loop, data.loop));
    const focused = Object.freeze(Object.assign({}, this.data.focused, data.focused));

    this.data = Object.freeze({
      maestro,
      score,
      fretboard,
      loop,
      focused
    });

    this._snapshotAt = Date.now();

    return this.data;
  }
}

export default Snapshot;
