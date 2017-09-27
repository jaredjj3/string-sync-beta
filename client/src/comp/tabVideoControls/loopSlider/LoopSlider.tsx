import React from 'react';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';
import { Player } from 'services/vexflow';

interface LoopSliderProps {
  tabPlayer: Player;
}

interface LoopSliderState {
  marks: any;
}

class LoopSlider extends React.Component<LoopSliderProps, LoopSliderState> {
  state: LoopSliderState = {
    marks: { 0: '', 100: '' },
  };

  componentDidMount(): void {
    this.props.tabPlayer.loopSlider = this;
  }

  componentWillUnmount(): void {
    this.props.tabPlayer.loopSlider = null;
  }

  setMarks(marks: any): any {
    if (marks) {
      this.setState(Object.assign({}, this.state, { marks }));
    }
  }

  measureTipFormatter = (value: number): string => {
    const { marks } = this.state;

    const marksKeys = Object.keys(marks);
    const currentMeasure = marksKeys.indexOf(value.toString()) + 1;
    return `${currentMeasure} / ${marksKeys.length}`;
  }

  render(): JSX.Element {
    const { marks } = this.state;

    return (
      <div>
        <Slider
          range
          defaultValue={[0, 100]}
          step={null}
          marks={marks}
          tipFormatter={this.measureTipFormatter}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tabPlayer: state.tab.player,
  duration: state.tab.duration
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoopSlider);
