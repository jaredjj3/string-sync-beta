import * as React from 'react';
import { compose, branch, renderComponent, renderNothing } from 'recompose';
import { withViewport, withNotations, textWhileLoading } from 'enhancers';
import MobileLibraryContent from './mobile';
import DesktopLibraryContent from './desktop';
import { sortBy } from 'lodash';

const enhance = compose(
  withViewport,
  withNotations,
  textWhileLoading(({ isLoading }) => isLoading)
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

const LibraryContent = ({ viewport, notations }) => {
  const notationsByTag = getNotationsByTag(notations);
  const sortedTags = sortBy(Object.keys(notationsByTag), tag => notationsByTag[tag].length);

  if (viewport.state.type === 'MOBILE') {
    return (
      <MobileLibraryContent
        sortedTags={sortedTags}
        notationsByTag={notationsByTag} 
      />
    );
  } else {
    return (
      <DesktopLibraryContent
        sortedTags={sortedTags}
        notationsByTag={notationsByTag}
      />
    );
  }
};

export default enhance(LibraryContent);
