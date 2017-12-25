import * as React from 'react';
import { compose, lifecycle, withProps, shouldUpdate } from 'recompose';
import { withNotation, withTab, withViewport } from 'enhancers';
import { Tab } from 'services';
import { isBetween } from 'ssUtil';

const enhance = compose(
  withNotation,
  withTab,
  withViewport,
  shouldUpdate((currProps, nextProps) => (
    currProps.notation.state.vextabString !== nextProps.notation.state.vextabString ||
    currProps.viewport.state.width !== nextProps.viewport.state.width
  )),
  withProps(props => ({
    getMeasuresPerLine: width => {
      switch (true) {
        case width <= 646:
          return 1;
        case isBetween(width, 646, 768):
          return 2;
        case isBetween(width, 768, 992):
          return 3;
        case isBetween(width, 992, 1200):
          return 4;
        case isBetween(width, 1200, 1680):
          return 5;
        default:
          return Math.ceil(width / 336);
      }
    }
  })),
  withProps(props => ({
    maybeCreateTab: () => {
      const { vextabString } = props.notation.state;
      const shouldCreate = (
        (!props.tab.state.provider && vextabString) ||
        vextabString !== props.tab.state.provider.vextabString
      );

      if (shouldCreate) {
        const tab = new Tab(vextabString);
        tab.setup();

        const { width } = props.viewport.state;
        const measuresPerLine = props.getMeasuresPerLine(width);
        tab.createLines(measuresPerLine, width);

        props.tab.dispatch.setProvider(tab);
      }
    },
    maybeUpdateTab: () => {
      const tab = props.tab.state.provider;
      const { width } = props.viewport.state;
      const nextMeasuresPerLine = props.getMeasuresPerLine(width);
      const shouldUpdate = (
        tab &&
        tab.measuresPerLine !== nextMeasuresPerLine
      );

      if (shouldUpdate) {
        tab.createLines(nextMeasuresPerLine, width);
      }
    }
  })),
  lifecycle({
    componentWillReceiveProps(nextProps: any): void {
      nextProps.maybeCreateTab();
      nextProps.maybeUpdateTab();
    }
  })
);

const TabService = () => null;

export default enhance(TabService);
