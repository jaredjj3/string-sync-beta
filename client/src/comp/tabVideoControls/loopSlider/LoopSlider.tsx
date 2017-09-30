import React from 'react';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';
import { Player } from 'services/vexflow';
import interpolator from 'util/interpolator';
import formatTime from 'util/formatTime';

import { Interpolator } from 'util/interpolator';

interface LoopSliderProps {
  duration: number;
  updateLoop(loop: Array<number>): void;
}

interface LoopSliderState {
  values: [number, number];
}

class LoopSlider extends React.Component<LoopSliderProps, LoopSliderState> {
  state: LoopSliderState = {
    values: [0, 100]
  };

  private _toTime: Interpolator = null;
  private _toSeekSliderValue: Interpolator = null;

  componentWillReceiveProps(nextProps: LoopSliderProps): void {
    this._toTime = this._toTime || interpolator({ x: 0, y: 0 }, { x: 100, y: nextProps.duration });
    this._toSeekSliderValue = this._toSeekSliderValue || interpolator({ x: 0, y: 0 }, { x: nextProps.duration, y: 100 });
  }

  handleChange = (values: [number, number]): void => {
    this.setState(Object.assign({}, this.state, { values }));
  }

  handleAfterChange = (values: [number, number]): void => {
    if (this._toTime === null) {
      return;
    }

    const loop = values.map(value => this._toTime(value));
    this.props.updateLoop(loop);
  }

  tipFormatter = (value: number): string => {
    if (this._toTime === null) {
      return '0.0';
    }

    return formatTime(this._toTime(value));
  }

  render(): JSX.Element {
    const { values } = this.state;

    return (
      <div>
        <Slider
          range
          value={values}
          step={0.01}
          defaultValue={[0, 100]}
          tipFormatter={this.tipFormatter}
          onChange={this.handleChange}
          onAfterChange={this.handleAfterChange}
        />
      </div>
    );
  }
}

import { updateLoop } from 'data/video/actions';

const mapStateToProps = state => ({
  duration: state.notation.duration / 1000
});

const mapDispatchToProps = dispatch => ({
  updateLoop: loop => dispatch(updateLoop(loop))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoopSlider);
