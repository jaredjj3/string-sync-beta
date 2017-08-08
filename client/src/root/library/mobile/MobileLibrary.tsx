import React from 'react';

import Logo from 'comp/logo';
import Gradient from 'comp/gradient';
import LibraryGrid from './grid';

import './_mobileLibrary.less';

const MobileLibrary = ({ tagNotationsMap }): JSX.Element => (
  <div style={{ marginTop: '100px' }}>
    <div className="Library--mobile__header">
      <Gradient />
      <div className="Library--mobile__header__logo">
        <Logo showBar={false} />
      </div>
    </div>
    {
      tagNotationsMap.map((tagNotations) => (
        <div id={tagNotations.tag} key={tagNotations.tag} style={{ marginTop: '80px' }}>
          <h1 style={{ marginBottom: '10px', textAlign: 'center', fontSize: '36px' }}>
            {`${tagNotations.tag[0].toUpperCase()}${tagNotations.tag.slice(1)}`}
          </h1>
          <LibraryGrid tagNotations={tagNotations} />
        </div>
      ))
    }
  </div>
);

export default MobileLibrary;
