import * as React from 'react';
import { textWhileLoading } from 'enhancers';

const enhance = textWhileLoading(({ isLoading }) => isLoading);

const LibraryContent = enhance(() => (
  <div>
    Library Content!
  </div>
));

export default LibraryContent;
