import React from 'react';

import Affix from 'antd/lib/affix';
import Gradient from 'comp/gradient';
import LibraryGrid from './grid';
import Logo from 'comp/logo';
import Button from 'antd-mobile/lib/button';
import Icon from 'antd/lib/icon';

const MobileLibrary = ({ tagNotationsMap }) => (
  <div style={{ marginTop: '100px' }}>
    <div className="Library--mobile__header">
      <div className="Library--mobile__header__logo">
        <Logo showLogo={false} />
      </div>
    </div>
    {
      tagNotationsMap.map((tagNotations) => (
        <div id={tagNotations.tag} key={tagNotations.tag}>
          <div className="Library--mobile__content__titleContainer">
            <Affix target={() => window} offsetTop={2}>
              <h1 className="Library--mobile__content__title">
                {tagNotations.tag.toUpperCase()}
              </h1>
            </Affix>
          </div>
          <LibraryGrid tagNotations={tagNotations} />
        </div>
      ))
    }
    <div style={{ margin: '50px 20px 0 20px', textAlign: 'center', fontSize: '36px' }}>
      <Icon type="aliwangwang" onClick={() => scrollTo(0, 0)} />
    </div>
  </div>
);

export default MobileLibrary;
