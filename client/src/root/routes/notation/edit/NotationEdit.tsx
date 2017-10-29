import React from 'react';
import { connect } from 'react-redux';

import Collapse from 'antd/lib/collapse';
import Fretboard from 'comp/fretboard';
import Icon from 'antd/lib/icon';
import Save from './save';
import Tab from 'comp/tab';
import TabVideoControls from 'comp/tabVideoControls';
import VextabEditor from './vextab/editor';
import Video from 'comp/video';
import DeadTime from './deadTime';
import Row from 'antd/lib/row';
import Bpm from './bpm';

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
  resetNotation(): void;
}

interface NotationEditState {}

class NotationEdit extends React.Component<NotationEditProps, NotationEditState> {
  componentDidMount(): void {
    this.props.enableAutoSave();
    this.props.fetchNotation(this.props.params.id);
  }

  componentWillUnmount(): void {
    this.props.resetNotation();
    this.props.disableAutoSave();
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
        <Tab />
        <Row className="NotationEdit__syncControls" type="flex" align="middle">
          <Save />
          <DeadTime />
          <Bpm />
        </Row>
        <VextabEditor />
        <TabVideoControls />
      </div>
    );
  }
}

import { fetchNotation, resetNotation } from 'data/notation/actions';
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
  resetNotation: () => dispatch(resetNotation())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotationEdit);
