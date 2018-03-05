import * as React from 'react';
import { compose, withHandlers } from 'recompose';
import { InputNumber } from 'antd';
import { withNotation } from 'enhancers';

const enhance = compose(
  withNotation,
  withHandlers({
    handleChange: props => durationMs => {
      const notation = Object.assign(props.notation.state, { durationMs });
      props.notation.dispatch.setNotation(notation);
    }
  })
);

const Duration = ({ notation, handleChange }) => (
  <div className="Duration">
    <h3>Duration ms</h3>
    <InputNumber
      step={0.01}
      value={notation.state.durationMs}
      precision={2}
      onChange={handleChange}
    />
  </div>
);

export default enhance(Duration);
