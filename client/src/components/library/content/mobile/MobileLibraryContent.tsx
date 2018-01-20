import * as React from 'react';
import { compose } from 'recompose';
import { withNotations } from 'enhancers';
import { LogoImage, LogoText } from 'components';
import { Affix } from 'antd';
import LibraryGrid from './LibraryGrid';
import styled from 'styled-components';

const CONTENT_TITLE_HEIGHT_PX = 50;

const MobileLibraryOuter = styled.div`
  margin-bottom: 55px;

  .Library--mobile__header__logo {
    margin-top: 10px;
  }

  .Library--mobile__header {
    width: 100%;
    text-align: center;
  }

  .Library--mobile__tag {
    background: white;
    height: ${CONTENT_TITLE_HEIGHT_PX}px;
    box-sizing: border-box;
    content: '';
  }

  .Library--mobile__tag__title {
    text-align: center;
    z-index: 11;
    background: white;
    height: ${CONTENT_TITLE_HEIGHT_PX}px;
    line-height: ${CONTENT_TITLE_HEIGHT_PX}px;
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 3px;
    box-sizing: border-box;
  }
`;

const ContentHeader = () => (
  <div className="Library--mobile--contentHeader">
    <div className="Library--mobile__header">
      <div className="Library--mobile__header__logo">
        <LogoText style={{ fontSize: '24px' }}/>
      </div>
      <div className="Library--mobile__header__logo">
        <LogoImage style={{ width: '48px' }}/>
      </div>
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
  <MobileLibraryOuter>
    <ContentHeader />
    <TagContent
      sortedTags={sortedTags}
      notationsByTag={notationsByTag}
    />
  </MobileLibraryOuter>
);

export default MobileLibraryContent;
