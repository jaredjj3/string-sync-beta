import React from 'react';

import LibraryCarousel from './carousel';

const DesktopLibrary = ({ tagNotationsMap }): JSX.Element => (
  <div>
    {
      tagNotationsMap.map((tagNotations, i) => (
        <LibraryCarousel key={tagNotations.tag} tagNotations={tagNotations} />
      ))
    }
  </div>
);

export default DesktopLibrary;
