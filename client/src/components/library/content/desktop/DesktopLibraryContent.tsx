import * as React from 'react';
import { LibraryCarousel } from './';

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
);

export default DesktopLibraryContent;
