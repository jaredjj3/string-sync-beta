import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import Banner from './banner';
import Provider from './provider';
import Controls from '../controls';
import { VexProvider } from 'services/vexflow';
import { Video, Fretboard, Tab } from 'comp';
import { withRAFLoop, withVideo } from 'enhancers';
import { fetchNotation, resetNotation } from 'data/notation/actions';
import { enableFeatures, disableFeatures } from 'data/feature/actions';

const mapDispatchToProps = dispatch => ({
  fetchNotation: (notationId: number) => dispatch(fetchNotation(notationId)),
  resetNotation: () => dispatch(resetNotation()),
  showNav: () => dispatch(enableFeatures(['navbar'])),
  hideNav: () => dispatch(disableFeatures(['navbar']))
});

const enhance = compose(
  withRAFLoop,
  withVideo,
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount(): void {
      const notationId = this.props.match.params.id;
      this.props.fetchNotation(notationId);
      this.props.hideNav();
      const provider = new VexProvider();
    },
    componentWillReceiveProps(nextProps: any): void {
      const { RAFLoop, isVideoActive } = nextProps;
      isVideoActive ? RAFLoop.start() : RAFLoop.stop();
    },
    componentWillUnmount(): void {
      this.props.resetNotation();
      this.props.showNav();
      this.props.resetRAFLoop();
    }
  })
);

export default enhance(() => (
  <div className="NotationShow">
    <Banner />
    <Video />
    <Provider>
      <Fretboard />
      <Tab />
      <Controls />
    </Provider>
  </div>
));
