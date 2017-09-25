import React from 'react';
import { connect } from 'react-redux';

import Button from 'antd/lib/button';
import Collapse from 'antd/lib/collapse';
import Fretboard from 'comp/fretboard';
import Icon from 'antd/lib/icon';
import PressedNotes from './pressedNotes';
import ScaleVisualizationToggle from './scaleVisualizationToggle';
import Tab from 'comp/tab';
import TabControls from 'comp/tab/controls';
import Tuning from './tuning';
import VextabEditor from './vextab/editor';
import Video from 'comp/video';
import VideoControls from 'comp/video/controls';

import { Notation } from 'types/notation';
import { Device } from 'types/device';

const { Panel } = Collapse;

interface NotationEditProps {
  device: Device;
  params: any;
  showFretboard: boolean;
  showFretboardControls: boolean;
  autoSave: boolean;
  scaleVisualization: boolean;
  fetchNotation(id: number): void;
  enableAutoSave(): void;
  disableAutoSave(): void;
  enableScaleVisualization(): void;
  disableScaleVisualization(): void;
  updateNotation(updateStore?: boolean): void;
}

interface NotationEditState {}

class NotationEdit extends React.Component<NotationEditProps, NotationEditState> {
  componentDidMount(): void {
    this.props.enableAutoSave();
    this.props.fetchNotation(this.props.params.id);
  }

  componentWillUnmount(): void {
    this.props.disableAutoSave();
  }

  handleSaveButtonClick = (): void => {
    this.props.updateNotation(false);
  }

  render(): JSX.Element {
    const { showFretboard, showFretboardControls, scaleVisualization } = this.props;

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
        <Tuning />
        <ScaleVisualizationToggle />
        <PressedNotes />
        <Button onClick={this.handleSaveButtonClick}>Save</Button>
        <Tab />
        <VextabEditor />
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

import { fetchNotation, updateNotation } from 'data/notation/actions';
import { enableFeatures, disableFeatures } from 'data/feature/actions';

const mapStateToProps = state => ({
  showFretboard: state.panels.fretboard,
  showFretboardControls: state.panels.fretboardControls,
  autoSave: state.feature.autoSave,
  scaleVisualization: state.feature.scaleVisualization
});

const mapDispatchToProps = dispatch => ({
  fetchNotation: id => dispatch(fetchNotation(id)),
  enableAutoSave: () => dispatch(enableFeatures(['autoSave'])),
  disableAutoSave: () => dispatch(disableFeatures(['autoSave'])),
  updateNotation: (updateStore) => dispatch(updateNotation(updateStore))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotationEdit);
