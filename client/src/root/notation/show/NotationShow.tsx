import React from 'react';
import { connect } from 'react-redux';

import Video from 'comp/video';
import VideoControls from 'comp/video/controls';
import Fretboard from 'comp/fretboard';
import Tab from 'comp/tab';
import TabControls from 'comp/tab/controls';
import Collapse from 'antd/lib/collapse';
import Icon from 'antd/lib/icon';

import { Notation } from 'types/notation';
import { Device } from 'types/device';

const { Panel } = Collapse;

interface NotationShowProps {
  device: Device;
  params: any;
  showFretboard: boolean;
  showFretboardControls: boolean;
  fetchNotation(id: number): void;
}

interface NotationShowState {}

class NotationShow extends React.Component<NotationShowProps, NotationShowState> {
  componentDidMount(): void {
    this.props.fetchNotation(this.props.params.id);
  }

  render(): JSX.Element {
    const { showFretboard, showFretboardControls } = this.props;

    return (
      <div className="NotationShow">
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
        <div className="NotationShow__controls">
          <Collapse activeKey={showFretboardControls ? 'fretboardControls' : null}>
            <Panel className="NotationShow__panel" key="fretboardControls" header="">
              <TabControls />
            </Panel>
          </Collapse>
          <VideoControls />
        </div>
      </div>
    );
  }
}

import { fetchNotation } from 'data/notation/actions';

const mapStateToProps = state => ({
  showFretboard: state.panels.fretboard,
  showFretboardControls: state.panels.fretboardControls
});

const mapDispatchToProps = dispatch => ({
  fetchNotation: id => dispatch(fetchNotation(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotationShow);
