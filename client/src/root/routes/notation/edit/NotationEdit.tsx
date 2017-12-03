import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFeatures, withRaf, withNotation } from 'enhancers';
import Provider from '../provider';
import { VexProvider } from 'services/vexflow';
import { Video, Fretboard, Tab } from 'components';
import VextabEditor from './vextab/editor';
import DeadTime from './deadTime';
import Row from 'antd/lib/row';
import Bpm from './bpm';
import Save from './save';
import { Notation, RAF, Features } from 'types';

interface NotationEditProps {
  notation: Notation;
  raf: RAF;
  features: Features;
  match: any;
  showFretboard: boolean;
  showFretboardControls: boolean;
  autoSave: boolean;
  scaleVisualization: boolean;
  RAFLoop: any;
  fetchNotation(id: number): void;
  enableFeatures(features: Array<string>): void;
  disableFeatures(features: Array<string>): void;
  enableScaleVisualization(): void;
  disableScaleVisualization(): void;
  resetNotation(): void;
}

interface NotationEditState {}

class NotationEdit extends React.Component<NotationEditProps, NotationEditState> {
  componentDidMount(): void {
    this.props.enableFeatures(['autoSave']);
    this.props.fetchNotation(this.props.match.params.id);
    this.props.raf.loop.start();
  }

  componentWillUnmount(): void {
    this.props.resetNotation();
    this.props.disableFeatures(['autoSave']);
    this.props.raf.loop.stop();
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

const enhance = compose(
  withRaf,
  withFeatures,
  withNotation
);

export default enhance(NotationEdit);
