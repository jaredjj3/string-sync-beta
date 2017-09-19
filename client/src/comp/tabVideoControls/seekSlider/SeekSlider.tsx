import React from 'react';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';

interface SeekSliderProps {}

interface SeekSliderState {}

class SeekSlider extends React.PureComponent<SeekSliderProps, SeekSliderState> {
  render(): JSX.Element {
    return (
      <div>
        <Slider />
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
)(SeekSlider);
