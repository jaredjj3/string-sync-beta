import * as React from 'react';
import { compose } from 'recompose';
import { withNotations } from 'enhancers';
import { LogoImage, LogoText } from 'components';
import { Affix } from 'antd';
import LibraryGrid from './LibraryGrid';

const ContentHeader = () => (
  <div className="Library--mobile--contentHeader">
    <div className="Library--mobile__headerSpacer" />
    <div className="Library--mobile__header">
      <div className="Library--mobile__header__logo">
        <LogoText style={{ fontSize: '24px' }}/>
      </div>
      <LogoImage style={{ width: '48px', paddingTop: '10px' }}/>
    </div>
  </div>
);

const TagContent = ({ sortedTags, notationsByTag }) => (
  sortedTags.map(tag => (
    <div key={`moble-library-tag-content-${tag}`}>
      <div className="Library--mobile__tag">
        <Affix
          target={() => window}
          offsetTop={2}
        >
          <h1 className="Library--mobile__tag__title">
            {tag.toUpperCase()}
          </h1>
        </Affix>
      </div>
      <LibraryGrid notations={notationsByTag[tag]} />
    </div>
  ))
);

const MobileLibraryContent = ({ sortedTags, notationsByTag }) => (
  <div className="Library--mobile">
    <ContentHeader />
    <TagContent
      sortedTags={sortedTags}
      notationsByTag={notationsByTag}
    />
  </div>
);

export default MobileLibraryContent;
