import * as React from 'react';

const NotationDetailLinks = ({ notations }) => (
  notations.state.map(notation => (
    <Link
      to={`/n/${notation.id}`}
      key={`Library--content-${notation.id}`}
    >
      <NotationDetail notation={notation} />
    </Link>
  ))
);
