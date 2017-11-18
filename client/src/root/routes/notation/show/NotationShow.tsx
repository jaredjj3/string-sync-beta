import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { Collapse, Icon, Row, Col } from 'antd';
import { withRAFLoop } from 'enhancers';
import Fretboard from 'comp/fretboard';
import Tab from 'comp/tab';
import TabVideoControls from 'comp/tabVideoControls';
import Video from 'comp/video';
import Banner from './banner';
import { isVideoActive } from 'util/videoStateCategory';

import { Notation } from 'types/notation';
import { Device } from 'types/device';

const { Panel } = Collapse;

interface NotationShowProps {
  device: Device;
  match: any;
  showFretboard: boolean;
  showFretboardControls: boolean;
  shouldRAF: boolean;
  RAFLoop: any;
  fetchNotation(id: number): void;
  resetNotation(): void;
  showNav(): void;
  hideNav(): void;
  resetRAFLoop(): void;
}

interface NotationShowState {}

class NotationShow extends React.Component<NotationShowProps, NotationShowState> {
  componentDidMount(): void {
    this.props.fetchNotation(this.props.match.params.id);
    this.props.hideNav();
  }

  componentWillReceiveProps(nextProps: NotationShowProps): void {
    const { RAFLoop } = nextProps;

    if (nextProps.shouldRAF) {
      RAFLoop.start();
    } else {
      RAFLoop.stop();
    }
  }

  componentWillUnmount(): void {
    this.props.resetNotation();
    this.props.showNav();
    this.props.resetRAFLoop();
  }

  render(): JSX.Element {
    const { showFretboard, showFretboardControls } = this.props;

    return (
      <div className="NotationShow">
        <Banner />
        <Video />
        <Collapse
          activeKey={showFretboard ? 'fretboard' : null}
          bordered={false}
        >
          <Panel className="NotationShow__panel" key="fretboard" header="">
            <Fretboard />
          </Panel>
        </Collapse>
        <Tab />
      </div>
    );
  }
}

import { fetchNotation, resetNotation } from 'data/notation/actions';
import { enableFeatures, disableFeatures } from 'data/feature/actions';

const mapStateToProps = state => ({
  shouldRAF: isVideoActive(state.video.state),
  showFretboard: state.panels.fretboard,
  showFretboardControls: state.panels.fretboardControls
});

const mapDispatchToProps = dispatch => ({
  fetchNotation: id => dispatch(fetchNotation(id)),
  resetNotation: () => dispatch(resetNotation()),
  showNav: () => dispatch(enableFeatures(['navbar'])),
  hideNav: () => dispatch(disableFeatures(['navbar']))
});

export default compose(
  withRAFLoop,
  connect(mapStateToProps, mapDispatchToProps)
)(NotationShow);
