import * as React from 'react';
import { compose, setStatic } from 'recompose';

const DOTS: Array<number> = [
  0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0,
  2, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0
];

const enhance = compose(
  setStatic('DOTS', DOTS)
);

const Frets = () => (
  <div className="Frets">
    Frets
  </div>
);

export default enhance(Frets);
