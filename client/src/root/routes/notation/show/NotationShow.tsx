import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Banner from './banner';
import Provider from '../provider';
import Controls from '../controls';
import { VexProvider } from 'services/vexflow';
import { Video, Fretboard, Tab } from 'components';
import { withRaf, withVideo, withNotation, withFeatures } from 'enhancers';

const enhance = compose(
  withRaf,
  withVideo,
  withNotation,
  withFeatures,
  lifecycle({
    componentDidMount(): void {
      const notationId = this.props.match.params.id;
      this.props.fetchNotation(notationId);
      this.props.disableFeatures(['navbar']);
      this.props.raf.loop.start();
    },
    componentWillUnmount(): void {
      this.props.resetNotation();
      this.props.enableFeatures(['navbar']);
      this.props.resetRafLoop();
      this.props.raf.loop.stop();
    }
  })
);

const NotationShow = () => (
  <div className="NotationShow">
    <Banner />
    <Video />
    <Provider>
      <Fretboard />
      <Tab />
    </Provider>
    <Controls />
  </div>
);

export default enhance(NotationShow);
