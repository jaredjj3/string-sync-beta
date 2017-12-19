import * as React from 'react';
import { textWhileLoading } from 'enhancers';

const enhance = textWhileLoading(({ isLoading }) => isLoading);

const LibraryContent = (props) => (
  <div className="Library--content">
    Library content
  </div>
);

export default enhance(LibraryContent);
