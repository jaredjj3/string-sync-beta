import React from 'react';
import { connect } from 'react-redux';

import formatTime from 'util/formatTime';
import Slider from 'antd/lib/slider';
import dupNotation from 'util/dup/notation';

import { Notation } from 'types/notation';

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
    const deadTimeValue = nextProps.notation.deadTime;
    this.setState(Object.assign({}, this.state, { deadTimeValue }));
  }

  handleChange = (deadTimeValue: number): void => {
    this.setState(Object.assign({}, this.state, { deadTimeValue }));
  }

  handleAfterChange = (value: number): void => {
    const nextNotation = dupNotation(this.props.notation);
    nextNotation.deadTime = value;
    this.props.updateNotation(nextNotation);
  }

  tipFormatter = (value: number): string => {
    return formatTime(value / 1000);
  }

  render(): JSX.Element {
    const { duration } = this.props.notation;
    const { deadTimeValue } = this.state;

    return (
      <div className="DeadTime">
        <h2>Dead Time</h2>
        <Slider
          step={1}
          max={duration}
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

import { updateNotation } from 'data/notation/actions';

const mapStateToProps = state => ({
  notation: state.notation
});

const mapDispatchToProps = dispatch => ({
  updateNotation: notation => dispatch(updateNotation(notation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeadTime);
