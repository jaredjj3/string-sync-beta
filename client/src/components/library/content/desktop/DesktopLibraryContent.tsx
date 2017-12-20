import * as React from 'react';
import { compose } from 'recompose';
import { withNotations } from 'enhancers';
import LibraryCarousel from './carousel';
import { sortBy } from 'lodash';

interface LibraryContentProps {
  notations: Enhancers.Notations;
}

const enhance = compose(
  withNotations
);

const getNotationsByTag = (notations: Enhancers.Notations) => (
  notations.state.reduce((memo, notation) => {
    notation.tags.forEach(tag => {
      memo[tag] = memo[tag] || [];
      memo[tag].push(notation);
    });
    return memo;
  }, {})
);

const LibraryCarouselListItems = ({ notations }) => {
  const notationsByTag = getNotationsByTag(notations);
  const sortedTags = sortBy(Object.keys(notationsByTag), tag => notationsByTag[tag].length);
  return sortedTags.map(tag => (
    <li
      key={`library-carousel-list-items-${tag}`}
      className="Library--content__carousels__carousel"
    >
      <h1>{`${tag.toUpperCase()} (${notationsByTag[tag].length})`}</h1>
      <LibraryCarousel title={tag} notations={notationsByTag[tag]} />
    </li>
  ));
};

const LibraryContent = ({ notations }: LibraryContentProps) => (
  <div className="Library--content">
    <ul className="Library--content__carousels">
      <LibraryCarouselListItems notations={notations} />
    </ul>
  </div>
);

export default enhance(LibraryContent);
