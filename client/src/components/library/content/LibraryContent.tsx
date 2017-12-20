import * as React from 'react';
import { compose, branch, renderComponent, renderNothing } from 'recompose';
import { withViewport, textWhileLoading } from 'enhancers';
import MobileLibraryContent from './mobile';
import DesktopLibraryContent from './desktop';

const enhance = compose(
  withViewport,
  textWhileLoading(({ isLoading }) => isLoading),
  branch(
    ({ viewport }) => viewport.state.type === 'MOBILE',
    renderComponent(MobileLibraryContent),
    renderComponent(DesktopLibraryContent)
  )
);

const LibraryContent = renderNothing();

export default enhance(LibraryContent);