import React from 'react';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';

import { SeekSliderValues } from '../VideoControls';

type UpdateSliderFunc = (value: number | SeekSliderValues) => void;

interface ScrubberProps {
  values: SeekSliderValues;
  onChange: UpdateSliderFunc;
  onAfterChange: any;
}

interface ScrubberState {

}

class Scrubber extends React.PureComponent<ScrubberProps, ScrubberState> {
  static DEFAULT_VALUES: SeekSliderValues = [-1, 0, 101];

  render(): JSX.Element {
    const { values, onChange, onAfterChange } = this.props;

    return (
      <div>
        <Slider
          range
          min={-1}
          max={101}
          step={0.01}
          onChange={onChange}
          defaultValue={Scrubber.DEFAULT_VALUES}
          value={values}
          tipFormatter={null}
          onAfterChange={onAfterChange}
        />
      </div>
    );
  }
}

export default Scrubber;
