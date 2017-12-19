import * as React from 'react';
import { branch, renderComponent } from 'recompose';

const LoadingText = () => (
  <div className="Loading--text">
    Loading...
  </div>
);

const textWhileLoading = isLoading => branch(
  isLoading,
  renderComponent(LoadingText)
);

export default textWhileLoading;
