import React from 'react';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';
import dupNotation from 'util/dup/notation';

import { Notation } from 'types/notation';

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
    const bpmValue = nextProps.notation.tempo;
    this.setState(Object.assign({}, this.state, { bpmValue }));
  }

  handleChange = (bpmValue: number): void => {
    this.setState(Object.assign({}, this.state, { bpmValue }));
  }

  handleAfterChange = (value: number): void => {
    const nextNotation = dupNotation(this.props.notation);
    nextNotation.tempo = value;
    this.props.updateNotation(nextNotation);
  }

  render(): JSX.Element {
    const { bpmValue } = this.state;

    return (
      <div>
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
)(Bpm);
