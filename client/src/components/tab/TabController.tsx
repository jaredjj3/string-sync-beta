import * as React from 'react';
import { compose, withState, mapProps, lifecycle, withProps, withHandlers } from 'recompose';
import { withNotation, withTab, withViewport } from 'enhancers';
import { Tab } from 'services';

const enhance = compose(
  withNotation,
  withTab,
  withViewport,
  mapProps(props => {
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
      const { note } = window.ss.maestro.snapshot.data;
      const { focusedNote } = props;

      if (focusedNote && focusedNote.renderer.currentStyle !== 'DEFAULT') {
        focusedNote.renderer.setStyle('DEFAULT').redraw();
      }

      if (note && note.renderer.currentStyle !== 'ACTIVE') {
        note.renderer.setStyle('ACTIVE').redraw();
      }

      if (note !== focusedNote) {
        props.setFocusedNote(note);
      }
    }
  }),
  withProps(props => {
    const name = 'TabService.handleAnimationLoop';

    return ({
      registerRaf: () => {
        window.ss.rafLoop.register({
          name,
          precedence: 4,
          onAnimationLoop: props.handleAnimationLoop
        });
      },
      unregisterRaf: () => {
        window.ss.rafLoop.unregister(name);
      }
    });
  }),
  lifecycle({
    componentWillReceiveProps(nextProps: any): void {
      nextProps.unregisterRaf();

      if (nextProps.shouldCreateTab) {
        const tab = new Tab(nextProps.vextabString, nextProps.width);
        window.ss.maestro.tab = tab;
        nextProps.setTab(tab);
      }

      if (nextProps.isDynamic) {
        nextProps.registerRaf();
      }
    },
    componentWillUnmount(): void {
      this.props.unregisterRaf();
      window.ss.maestro.tab = null;
      this.props.resetTab();
    }
  })
);

const TabController = () => null;

export default enhance(TabController);
