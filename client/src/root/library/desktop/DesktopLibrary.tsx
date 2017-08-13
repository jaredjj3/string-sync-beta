import React from 'react';

import LibraryCarousel from './carousel';

const DesktopLibrary = ({ tagNotationsMap }): JSX.Element => (
  <div>
    {
      tagNotationsMap.map((tagNotations) => (
        <div id={tagNotations.tag} key={tagNotations.tag} style={{ marginTop: '20px' }}>
          <h1 className="Library--desktop__content__title">{tagNotations.tag.toUpperCase()}</h1>
          <LibraryCarousel tagNotations={tagNotations} />
        </div>
      ))
    }
  </div>
);

export default DesktopLibrary;
