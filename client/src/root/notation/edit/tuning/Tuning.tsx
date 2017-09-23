import React from 'react';
import { connect } from 'react-redux';

import Input from 'antd/lib/input';

interface TuningProps {
  tuning: string;
  updateTuning(tuning: string): void;
  resetTuning(): void;
}

interface TuningState {}

class Tuning extends React.Component<TuningProps, TuningState> {
  componentWillUnmount(): void {
    this.props.resetTuning();
  }

  handleChange = (e: any): void => {
    this.props.updateTuning(e.target.value);
  }

  render(): JSX.Element {
    const { tuning } = this.props;

    return (
      <div className="TuningContainer">
        <div className="Tuning">
          <h2>Tuning</h2>
          <Input
            size="large"
            style={{ marginTop: '10px' }}
            value={tuning}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

import { updateTuning, resetTuning } from 'data/tuning/actions';

const mapStateToProps = state => ({
  tuning: state.tuning
});

const mapDispatchToProps = dispatch => ({
  updateTuning: (tuning: string) => dispatch(updateTuning(tuning)),
  resetTuning: () => dispatch(resetTuning())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tuning);
