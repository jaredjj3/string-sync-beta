import React from 'react';

import LibraryCarousel from './carousel';

const DesktopLibrary = ({ tagNotationsMap }): JSX.Element => (
  <div>
    {
      tagNotationsMap.map((tagNotations) => (
        <div id={tagNotations.tag} key={tagNotations.tag} style={{ marginTop: '20px' }}>
          <h1>{`${tagNotations.tag[0].toUpperCase()}${tagNotations.tag.slice(1)}`}</h1>
          <LibraryCarousel tagNotations={tagNotations} />
        </div>
      ))
    }
  </div>
);

export default DesktopLibrary;
