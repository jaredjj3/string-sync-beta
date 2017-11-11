import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { Viewport } from 'types';
import { Artist, VexPlayer, Tickman } from 'services/vexflow';

interface TabServicesProps {
  artist: Artist;
  vexPlayer: VexPlayer;
  tickman: Tickman;
  viewport: Viewport;
  setVexPlayer(vexPlayer: VexPlayer): void;
  setTickman(tickman: Tickman): void;
  resetTab(): void;
}

interface TabServicesState {}

class TabServices extends React.Component<TabServicesProps, TabServicesProps> {
  componentDidMount(): void {
    const vexPlayer = new VexPlayer();
    const tickman = new Tickman(vexPlayer);
    this.props.setVexPlayer(vexPlayer);
    this.props.setTickman(tickman);
  }

  componentWillReceiveProps(nextProps: TabServicesProps): void {
    this.emitUpdateEvents(this.props, nextProps);
  }

  componentWillUnmount(): void {
    this.props.resetTab();
  }

  emitUpdateEvents(prevProps: TabServicesProps, nextProps: TabServicesProps): void {
    if (prevProps.artist !== nextProps.artist) {
      this.onArtistUpdate(nextProps.artist);
    }

    if (prevProps.viewport !== nextProps.viewport) {
      this.onViewportUpdate(nextProps.viewport);
    }
  }

  onArtistUpdate = (artist: Artist): void => {
    if (this.props.tickman) {
      this.props.tickman.artist = artist;
    }
  }

  onViewportUpdate = (viewport: Viewport): void => {
    if (this.props.tickman) {
      this.props.tickman.viewport = viewport;
    }
  }

  render(): any {
    return null;
  }
}

import { setVexPlayer, setTickman, resetTab  } from 'data/tab/actions';

const mapStateToProps = state => ({
  artist: state.tab.artist,
  vexPlayer: state.tab.vexPlayer,
  tickman: state.tab.tickman,
  viewport: state.device.viewport,
  deadTime: state.notation.deadTime,
  tempo: state.notation.tempo
});

const mapDispatchToProps = dispatch => ({
  setVexPlayer: vexPlayer => dispatch(setVexPlayer(vexPlayer)),
  setTickman: tickman => dispatch(setTickman(tickman)),
  resetTab: () => dispatch(resetTab())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(TabServices);
