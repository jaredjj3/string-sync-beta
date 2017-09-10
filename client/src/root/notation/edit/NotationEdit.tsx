import React from 'react';
import { connect } from 'react-redux';

import VextabEditor from './vextab/editor';
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

interface NotationEditProps {
  device: Device;
  params: any;
  showFretboard: boolean;
  showFretboardControls: boolean;
  fetchNotation(id: number): void;
}

interface NotationEditState {}

class NotationEdit extends React.Component<NotationEditProps, NotationEditState> {
  componentDidMount(): void {
    this.props.fetchNotation(this.props.params.id);
  }

  render(): JSX.Element {
    const { showFretboard, showFretboardControls } = this.props;

    return (
      <div className="NotationEdit">
        <Video />
        <Collapse
          activeKey={showFretboard ? 'fretboard' : null}
          bordered={false}
        >
          <Panel className="NotationEdit__panel" key="fretboard" header="">
            <Fretboard />
          </Panel>
        </Collapse>
        <VextabEditor />
        <Tab />
        <div className="NotationEdit__controls">
          <Collapse activeKey={showFretboardControls ? 'fretboardControls' : null}>
            <Panel className="NotationEdit__panel" key="fretboardControls" header="">
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
)(NotationEdit);
