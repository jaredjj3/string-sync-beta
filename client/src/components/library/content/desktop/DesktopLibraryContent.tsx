import * as React from 'react';
import { LibraryCarousel } from './';
import styled from 'styled-components';

const DesktopLibraryContentOuter = styled.div`
  .Library--desktop {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }

  .Library--desktop__inner {
    width: 100%;
    max-width: 980px;
  }

  .Library--desktop__carousels {
    list-style: none;
    list-style-type: none;
    padding: 0; 
    margin: 0;
  }

  .Library--desktop__carousels__item {
    margin-bottom: 30px;

    &:hover .LibraryCarousel__prev,
    &:hover .LibraryCarousel__next {
      opacity: 0.5;
    }
  }
`;

const LibraryCarouselListItems = ({ sortedTags, notationsByTag }) => (
  sortedTags.map(tag => (
    <li 
      key={`library-carousel-list-items-${tag}`}
      className="Library--desktop__carousels__item"
    >
      <h1>{`${tag.toUpperCase()} (${notationsByTag[tag].length})`}</h1>
      <LibraryCarousel title={tag} notations={notationsByTag[tag]} />
    </li>
  ))
);

const DesktopLibraryContent = ({ sortedTags, notationsByTag }) => (
  <DesktopLibraryContentOuter>
    <div className="Library--desktop">
      <div className="Library--desktop__inner">
        <ul className="Library--desktop__carousels">
          <LibraryCarouselListItems
            sortedTags={sortedTags}
            notationsByTag={notationsByTag}
          />
        </ul>
      </div>
    </div>
  </DesktopLibraryContentOuter>
);

export default DesktopLibraryContent;
