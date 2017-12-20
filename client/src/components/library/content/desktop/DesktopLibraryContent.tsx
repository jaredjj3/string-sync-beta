import * as React from 'react';
import LibraryCarousel from './carousel';

const LibraryCarouselListItems = ({ sortedTags, notationsByTag }) => (
  sortedTags.map(tag => (
    <li key={`library-carousel-list-items-${tag}`}>
      <h1>{`${tag.toUpperCase()} (${notationsByTag[tag].length})`}</h1>
      <LibraryCarousel title={tag} notations={notationsByTag[tag]} />
    </li>
  ))
);

const DesktopLibraryContent = ({ sortedTags, notationsByTag }) => (
  <div className="Library--desktop">
    <ul className="Library--desktop__carouselList">
      <LibraryCarouselListItems
        sortedTags={sortedTags}
        notationsByTag={notationsByTag}
      />
    </ul>
  </div>
);

export default DesktopLibraryContent;
