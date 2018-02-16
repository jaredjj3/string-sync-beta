class Snapshot {
  data: SnapshotData = {
    maestro: {
      tick: -1,
      timeMs: -1
    },
    tab: {
      line: null,
      measure: null,
      note: null
    },
    fretboard: {
      lightGuitarPositions: [],
      justPressGuitarPositions: [],
      pressGuitarPositions: []
    },
    loop: {
      notes: null,
      tickRange: [0, 60000],
      isScrubbing: false
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
    const tab = Object.freeze(Object.assign({}, this.data.tab, data.tab));
    const fretboard = Object.freeze(Object.assign({}, this.data.fretboard, data.fretboard));
    const loop = Object.freeze(Object.assign({}, this.data.loop, data.loop));

    this.data = Object.freeze({
      maestro,
      tab,
      fretboard,
      loop
    });

    this._snapshotAt = Date.now();

    return this.data;
  }
}

export default Snapshot;
