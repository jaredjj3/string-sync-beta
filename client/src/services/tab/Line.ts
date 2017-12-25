import { Measure } from 'services';

class Line {
  measures: Array<Measure> = [];

  constructor(measures: Array<Measure>) {
    this.measures = measures;
  }
}

export default Line;
