import * as React from 'react';

const FretMarker = ({ string, fret }) => (
  <div className="FretMarker">
    {`${string},${fret}`}
  </div>
);

export default FretMarker;
