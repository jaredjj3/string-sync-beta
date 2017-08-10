import React from 'react';

import Affix from 'antd/lib/affix';
import Gradient from 'comp/gradient';
import LibraryGrid from './grid';
import Logo from 'comp/logo';
import Button from 'antd-mobile/lib/button';
import Icon from 'antd/lib/icon';

const MobileLibrary = ({ tagNotationsMap }) => (
  <div style={{ marginTop: '53px' }}>
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
    <div style={{ margin: '36px 20px 0 20px' }}>
      <Button
        type="primary"
        size="small"
        style={{ color: '#fff' }}
        onClick={() => scrollTo(0, 0)}
      >
        Back to Top
      </Button>
    </div>
  </div>
);

export default MobileLibrary;
