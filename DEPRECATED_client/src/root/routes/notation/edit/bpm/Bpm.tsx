import React from 'react';
import { compose } from 'recompose';
import { Slider } from 'antd';
import dupNotation from 'stringSyncUtil/dup/notation';
import { Notation } from 'types';
import { withNotation } from 'enhancers';

interface BpmProps {
  notation: Notation;
  updateNotation(notation: Notation): void;
}

interface BpmState {
  bpmValue: number;
}

class Bpm extends React.Component<BpmProps, BpmState> {
  state: BpmState = {
    bpmValue: 30
  };

  componentWillReceiveProps(nextProps: BpmProps): void {
    const bpmValue = nextProps.notation.bpm;
    this.setState(Object.assign({}, this.state, { bpmValue }));
  }

  handleChange = (bpmValue: number): void => {
    this.setState(Object.assign({}, this.state, { bpmValue }));
  }

  handleAfterChange = (value: number): void => {
    const nextNotation = dupNotation(this.props.notation);
    nextNotation.bpm = value;
    this.props.updateNotation(nextNotation);
  }

  render(): JSX.Element {
    const { bpmValue } = this.state;

    return (
      <div className="SyncControls__slider">
        <h2>Bpm</h2>
        <Slider
          step={1}
          min={30}
          max={230}
          value={bpmValue}
          defaultValue={30}
          onChange={this.handleChange}
          onAfterChange={this.handleAfterChange}
        />
      </div>
    );
  }
}

const enhance = compose(
  withNotation
);

export default enhance(Bpm);
