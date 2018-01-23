import { Line, Measure, Note } from 'services';

const getDefaultInterpolator = () => () => 0;

class Snapshot {
  data: SnapshotData = {
    tick: -1,
    timeMs: -1,
    line: null,
    measure: null,
    note: null,
    light: [],
    justPress: [],
    press: [],
    loopData: [null, null],
    interpolator: getDefaultInterpolator(),
    loopTick: [0, 60000]
  };

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
    this.data = Object.assign({}, this.data, data);
    this._snapshotAt = Date.now();
    Object.freeze(this.data);
    return this.data;
  }
}

export default Snapshot;
