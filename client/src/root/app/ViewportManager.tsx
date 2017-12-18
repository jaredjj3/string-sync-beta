import * as React from 'react';
import { compose, lifecycle, renderNothing } from 'recompose';
import { add, remove } from 'eventlistener';
import getViewport from 'ssUtil/getViewport';
import { throttle } from 'lodash';
import { withViewport } from 'enhancers';

const shouldUpdateViewport = (currViewport: Viewport, nextViewport: Viewport): boolean => {
  return (
    currViewport.width  !== nextViewport.width ||
    currViewport.height !== nextViewport.height
  );
};

const maybeSetViewport = throttle(({ viewport }) => event => {
  const currViewport = viewport.state;
  const nextViewport = getViewport();
  if (shouldUpdateViewport(currViewport, nextViewport)) {
    viewport.dispatch.setViewport(nextViewport);
  }
}, 30);

const ViewportManager = renderNothing();

const enhance = compose(
  withViewport,
  lifecycle({
    componentDidMount(): void {
      add(window, 'resize', maybeSetViewport(this.props));
    },
    componentWillUnmount(): void {
      remove(window, 'resize', maybeSetViewport(this.props));
    }
  })
);

export default enhance(ViewportManager);
