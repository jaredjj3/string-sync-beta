import * as React from 'react';
import { compose, withState, mapProps, lifecycle, withProps, withHandlers } from 'recompose';
import { withNotation, withTab, withViewport, withSync } from 'enhancers';
import { Tab } from 'services';

const enhance = compose(
  withNotation,
  withTab,
  withViewport,
  withSync,
  mapProps(props => {
    const { maestro, rafLoop } = props.sync.state;
    const tab = props.tab.state.instance;
    const { setTab, resetTab } = props.tab.dispatch;
    const { vextabString } = props.notation.state;
    const width = props.overrideWidth || props.viewport.state.width;
    const shouldCreateTab = (
      !tab ||
      tab.vextabString !== vextabString ||
      tab.width !== width
    );

    return {
      maestro,
      rafLoop,
      tab,
      vextabString,
      width,
      shouldCreateTab,
      setTab,
      resetTab,
      isDynamic: props.isDynamic
    };
  }),
  withState('focusedNote', 'setFocusedNote', null),
  withHandlers({
    handleAnimationLoop: props => () => {
      const { note } = props.maestro.snapshot.data;
      const { focusedNote } = props;
      
      if (note !== focusedNote) {
        props.tab.updateNoteColors(focusedNote, note);
        props.setFocusedNote(note);
      }
    }
  }),
  withProps(props => {
    const name = 'TabService.handleAnimationLoop';

    return ({
      registerRaf: () => {
        props.rafLoop.register({
          name,
          precedence: 4,
          onAnimationLoop: props.handleAnimationLoop
        });
      },
      unregisterRaf: () => {
        props.rafLoop.unregister(name);
      }
    });
  }),
  lifecycle({
    componentWillReceiveProps(nextProps: any): void {
      nextProps.unregisterRaf();

      if (nextProps.shouldCreateTab) {
        const tab = new Tab(nextProps.vextabString, nextProps.width);
        nextProps.maestro.tab = tab;
        nextProps.setTab(tab);
      }

      if (nextProps.isDynamic) {
        nextProps.registerRaf();
      }
    },
    componentWillUnmount(): void {
      this.props.unregisterRaf();
      this.props.maestro.tab = null;
      this.props.resetTab();
    }
  })
);

const TabAdapter = () => null;

export default enhance(TabAdapter);
