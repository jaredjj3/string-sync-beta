import React from 'react';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';

interface LoopSliderProps {}

interface LoopSliderState {
  marks: any;
}

class LoopSlider extends React.Component<LoopSliderProps, LoopSliderState> {
  state: LoopSliderState = {
    marks: { 0: '0', 100: '100' },
  };

  componentDidMount(): void {
    this.setMarks();
  }

  setMarks(): any {
    const marks = {
      0: '',
      20: '',
      40: '',
      60: '',
      80: '',
      100: ''
    };

    this.setState(Object.assign({}, this.state, { marks }));
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
          step={null}
          marks={marks}
          tipFormatter={this.measureTipFormatter}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoopSlider);
