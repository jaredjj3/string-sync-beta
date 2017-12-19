import * as React from 'react';
import { textWhileLoading } from 'enhancers';

const enhance = textWhileLoading(({ isLoading }) => isLoading);

const LibraryContent = enhance((props) => (
  <div className="Library--content">
    
  </div>
));

export default LibraryContent;
