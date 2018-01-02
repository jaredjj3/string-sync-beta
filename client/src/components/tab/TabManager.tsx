import * as React from 'react';
import { compose, lifecycle, withProps, shouldUpdate, withHandlers } from 'recompose';
import { withNotation, withTab, withViewport, withSync } from 'enhancers';
import { Tab, TabPlan } from 'services';
import { isBetween } from 'ssUtil';

const enhance = compose(
  withNotation,
  withTab,
  withViewport,
  withSync,
  withProps(props => ({
    width: props.overrideWidth || props.viewport.state.width
  })),
  shouldUpdate((currProps, nextProps) => (
    currProps.notation.state.vextabString !== nextProps.notation.state.vextabString ||
    currProps.width !== nextProps.width ||
    currProps.tab.state.updatedAt !== nextProps.tab.state.updatedAt
  )),
  withHandlers({
    handleAnimationLoop: props => () => {
      const tab = props.tab.state.instance;
      const { tabPlan } = props.sync.state.maestro;

      if (tab && tabPlan) {
        tab.update(tabPlan.execution);
      }
    }
  }),
  withProps(props => {
    const { rafLoop } = props.sync.state;
    const name = 'TabService.handleAnimationLoop';

    return ({
      registerRaf: () => {
        rafLoop.register({
          name,
          precedence: 4,
          onAnimationLoop: props.handleAnimationLoop
        });
      },
      unregisterRaf: () => {
        rafLoop.unregister(name);
      }
    });
  }),
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
  withProps(currProps => ({
    maybeCreateTab: nextProps => {
      const { vextabString } = nextProps.notation.state;
      const shouldCreate = (
        (!nextProps.tab.state.instance && vextabString) ||
        vextabString !== nextProps.tab.state.instance.vextabString
      );

      if (shouldCreate) {
        const tab = new Tab(vextabString);
        tab.setup();

        const { width } = nextProps;
        const measuresPerLine = nextProps.getMeasuresPerLine(width);
        tab.createLines(measuresPerLine, width);

        // Set the newly created tab instance in the Redux store
        nextProps.tab.dispatch.setTab(tab);

        // Create a new TabPlan from the tab and notify the maestro
        // of it.
        const tabPlan = new TabPlan(tab);
        nextProps.sync.state.maestro.tabPlan = tabPlan;
      }
    },
    maybeUpdateTab: nextProps => {
      const tab = nextProps.tab.state.instance;
      const { width } = nextProps;
      const measuresPerLine = nextProps.getMeasuresPerLine(width);
      const shouldUpdate = tab && (width !== tab.width);

      if (shouldUpdate) {
        tab.createLines(measuresPerLine, width);
        nextProps.tab.dispatch.emitTabUpdate();
      }
    },
    maybeSetupTabPlan: nextProps => {
      const tab = nextProps.tab.state.instance;
      const { tabPlan } = nextProps.sync.state.maestro;

      const shouldSetup = (
        tabPlan &&
        tab &&
        tab.lines.every(line => line.noteStave && line.noteStave.rendered)
      );

      if (shouldSetup) {
        tabPlan.setup();
      }
    }
  })),
  lifecycle({
    componentDidMount(): void {
      this.props.registerRaf();
    },
    componentWillReceiveProps(nextProps: any): void {
      nextProps.maybeCreateTab(nextProps);
      nextProps.maybeSetupTabPlan(nextProps);
      nextProps.maybeUpdateTab(nextProps);

      if (!nextProps.isDynamic) {
        nextProps.unregisterRaf();
      }
    },
    componentWillUnmount(): void {
      this.props.tab.dispatch.resetTab();
      this.props.sync.state.maestro.tabPlan = null;
      this.props.unregisterRaf();
    }
  })
);

const TabManager = () => null;

export default enhance(TabManager);
