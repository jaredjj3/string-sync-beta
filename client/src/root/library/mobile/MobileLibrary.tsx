import React from 'react';

import LibraryRow from './row';

const MobileLibrary = ({ tagNotationsMap }): JSX.Element => (
  <div>
    {
      tagNotationsMap.map((tagNotations) => (
        <div id={tagNotations.tag} key={tagNotations.tag} style={{ margin: '20px'}}>
          <h2>{`${tagNotations.tag[0].toUpperCase()}${tagNotations.tag.slice(1)}`}</h2>
          <LibraryRow tagNotations={tagNotations} />
        </div>
      ))
    }
  </div>
);

export default MobileLibrary;
