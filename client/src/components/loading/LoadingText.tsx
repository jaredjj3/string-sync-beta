import * as React from 'react';
import { branch, renderNothing } from 'recompose';

const showIfLoading = branch(
  ({ isLoading }) => isLoading,
  i => i,
  renderNothing
);

const LoadingText = showIfLoading(() => (
  <div className="Loading--text">
    Loading...
  </div>
));

export default LoadingText;
