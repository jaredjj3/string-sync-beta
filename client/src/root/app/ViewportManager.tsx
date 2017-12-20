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

let maybeSetViewport = ({ viewport }) => event => {
  const currViewport = viewport.state;
  const nextViewport = getViewport();
  if (shouldUpdateViewport(currViewport, nextViewport)) {
    viewport.dispatch.setViewport(nextViewport);
  }
};

maybeSetViewport = throttle(maybeSetViewport, 30);

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

const ViewportManager = renderNothing();

export default enhance(ViewportManager);
