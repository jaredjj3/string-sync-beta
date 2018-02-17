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

let maybeSetViewport = ({ viewport }) => throttle(event => {
  const currViewport = viewport.state;
  const nextViewport = getViewport();
  if (shouldUpdateViewport(currViewport, nextViewport)) {
    viewport.dispatch.setViewport(nextViewport);
  }
}, 30);

let throttledFunc = null;

const enhance = compose(
  withViewport,
  lifecycle({
    componentDidMount(): void {
      throttledFunc = maybeSetViewport(this.props);
      add(window, 'resize', throttledFunc);
    },
    componentWillUnmount(): void {
      remove(window, 'resize', throttledFunc);
    }
  })
);

const ViewportManager = renderNothing();

export default enhance(ViewportManager);
