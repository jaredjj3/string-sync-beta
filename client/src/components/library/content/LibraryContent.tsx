import * as React from 'react';
import { compose, branch, renderComponent, renderNothing } from 'recompose';
import { withViewport, withNotations, textWhileLoading } from 'enhancers';
import { DesktopLibraryContent, MobileLibraryContent } from './';
import { sortBy, merge } from 'lodash';

const enhance = compose(
  withViewport,
  withNotations,
);

const tagNewNotations = (notations: Enhancers.Notations) => {
  const dupNotations = merge([], notations.state);
  const twoWeeksAgo = Date.now() - (86400 * 14);

  dupNotations.forEach(notation => {
    const createdAt = Date.parse(notation.createdAt);
    if (createdAt < twoWeeksAgo) {
      notation.tags.push('new');
    }
  });

  return dupNotations;
};

const getNotationsByTag = notations => (
  notations.reduce((memo, notation) => {
    notation.tags.forEach(tag => {
      memo[tag] = memo[tag] || [];
      memo[tag].push(notation);
    });
    return memo;
  }, {})
);

const LibraryContent = ({ viewport, notations }) => {
  const notationsByTag = getNotationsByTag(tagNewNotations(notations));
  const sortedTags = sortBy(Object.keys(notationsByTag), tag => (
    tag === 'new' ? 100000 : notationsByTag[tag].length
  )).reverse();

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
