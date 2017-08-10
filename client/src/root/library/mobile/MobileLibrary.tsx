import React from 'react';

import Affix from 'antd/lib/affix';
import Gradient from 'comp/gradient';
import LibraryGrid from './grid';
import Logo from 'comp/logo';

const MobileLibrary = ({ tagNotationsMap }) => (
  <div style={{ marginTop: '75px' }}>
    <div className="Library--mobile__header">
      <Gradient />
      <div className="Library--mobile__header__logo">
        <Logo showLogo={false} />
      </div>
    </div>
    {
      tagNotationsMap.map((tagNotations) => (
        <div id={tagNotations.tag} key={tagNotations.tag}>
          <div className="Library--mobile__content__titleContainer">
            <Affix target={() => window} offsetTop={50}>
              <h1 className="Library--mobile__content__title">
                {tagNotations.tag.toUpperCase()}
              </h1>
            </Affix>
          </div>
          <LibraryGrid tagNotations={tagNotations} />
        </div>
      ))
    }
  </div>
);

export default MobileLibrary;
