import React from 'react';
import { connect } from 'react-redux';

import Input from 'antd/lib/input';

interface TuningProps {
  tuning: Array<string>;
  scaleVisualizer: any;
  updateTuning(tuning: Array<string>): void;
  resetTuning(): void;
}

interface TuningState {
  tuning: string;
}

class Tuning extends React.Component<TuningProps, TuningState> {
  state: TuningState = { tuning: 'E A D G B E' };

  componentWillReceiveProps(nextProps: TuningProps): void {
    const tuning = nextProps.tuning.join(' ');
    this.setState(Object.assign({}, this.state, { tuning }));
  }

  componentWillUnmount(): void {
    this.props.resetTuning();
  }

  handleChange = (e: any): void => {
    const tuning = e.target.value;
    this.setState(Object.assign({}, this.state, { tuning }));

    const tuningArray = tuning.split(' ');
    this.props.updateTuning(tuningArray);
    this.props.scaleVisualizer.tuning = tuningArray;
  }

  render(): JSX.Element {
    const { tuning } = this.state;

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

import { updateTuning, resetTuning } from 'data/tab/actions';

const mapStateToProps = state => ({
  tuning: state.tab.tuning,
  scaleVisualizer: state.tab.scaleVisualizer
});

const mapDispatchToProps = dispatch => ({
  updateTuning: (tuning: Array<string>) => dispatch(updateTuning(tuning)),
  resetTuning: () => dispatch(resetTuning())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tuning);
