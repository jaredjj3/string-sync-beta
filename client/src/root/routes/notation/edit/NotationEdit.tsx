import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withRAFLoop } from 'enhancers';
import Provider from '../provider';
import { VexProvider } from 'services/vexflow';
import { Video, Fretboard, Tab } from 'comp';
import VextabEditor from './vextab/editor';
import DeadTime from './deadTime';
import Row from 'antd/lib/row';
import Bpm from './bpm';
import Save from './save';

import { Notation } from 'types/notation';
import { Device } from 'types/device';

interface NotationEditProps {
  device: Device;
  match: any;
  showFretboard: boolean;
  showFretboardControls: boolean;
  autoSave: boolean;
  scaleVisualization: boolean;
  RAFLoop: any;
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
    this.props.fetchNotation(this.props.match.params.id);
    this.props.RAFLoop.start();
  }

  componentWillUnmount(): void {
    this.props.resetNotation();
    this.props.disableAutoSave();
    this.props.RAFLoop.stop();
  }

  render(): JSX.Element {
    const { showFretboard, showFretboardControls, scaleVisualization } = this.props;

    return (
      <div className="NotationEdit">
        <Video />
        <Provider>
          <Fretboard />
          <Tab allowScroll />
          <Row className="NotationEdit__syncControls" type="flex" align="middle">
            <Save />
            <DeadTime />
            <Bpm />
          </Row>
          <VextabEditor />
        </Provider>
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

export default compose(
  withRAFLoop,
  connect(mapStateToProps, mapDispatchToProps)
)(NotationEdit);
