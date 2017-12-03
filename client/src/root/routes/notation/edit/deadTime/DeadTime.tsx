import React from 'react';
import { compose } from 'recompose';
import { formatTime } from 'stringSyncUtil';
import Slider from 'antd/lib/slider';
import dupNotation from 'stringSyncUtil/dup/notation';
import { Notation } from 'types';
import { withNotation } from 'enhancers';

interface DeadTimeProps {
  notation: Notation;
  updateNotation(notation: Notation): void;
}

interface DeadTimeState {
  deadTimeValue: number;
}

class DeadTime extends React.Component<DeadTimeProps, DeadTimeState> {
  state: DeadTimeState = {
    deadTimeValue: 0
  };

  componentWillReceiveProps(nextProps: DeadTimeProps): void {
    const deadTimeValue = nextProps.notation.deadTimeMs;
    this.setState(Object.assign({}, this.state, { deadTimeValue }));
  }

  handleChange = (deadTimeValue: number): void => {
    this.setState(Object.assign({}, this.state, { deadTimeValue }));
  }

  handleAfterChange = (value: number): void => {
    const nextNotation = dupNotation(this.props.notation);
    nextNotation.deadTimeMs = value;
    this.props.updateNotation(nextNotation);
  }

  tipFormatter = (value: number): string => {
    return formatTime(value / 1000);
  }

  render(): JSX.Element {
    const { durationMs } = this.props.notation;
    const { deadTimeValue } = this.state;

    return (
      <div className="SyncControls__slider">
        <h2>Dead Time</h2>
        <Slider
          step={1}
          min={0}
          max={durationMs}
          value={deadTimeValue}
          defaultValue={0}
          onChange={this.handleChange}
          onAfterChange={this.handleAfterChange}
          tipFormatter={this.tipFormatter}
        />
      </div>
    );
  }
}

const enhance = compose(
  withNotation
);

export default enhance(DeadTime);
