import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, shouldUpdate, lifecycle } from 'recompose';
import Banner from './banner';
import Provider from '../provider';
import Controls from '../controls';
import { VexProvider } from 'services/vexflow';
import { Video, Fretboard, Tab, LogoImage } from 'components';
import { withRaf, withVideo, withNotation, withFeatures, withViewport } from 'enhancers';

const enhance = compose(
  withRaf,
  withVideo,
  withNotation,
  withFeatures,
  withViewport,
  shouldUpdate((props, nextProps) => {
    return props.viewport.type !== nextProps.viewport.type;
  }),
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
    <div className="NotationShow__logo">
      <span>
        <Link to="/library">
          <LogoImage style={{ width: '75px', height: '75px' }} />
          <div className="NotationShow__logo__backText">
            back
          </div>
        </Link>
      </span>
    </div>
    <Controls />
  </div>
);

export default enhance(NotationShow);
