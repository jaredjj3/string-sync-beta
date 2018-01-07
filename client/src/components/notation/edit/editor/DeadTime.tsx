import * as React from 'react';
import { compose, withHandlers } from 'recompose';
import { withNotation } from 'enhancers';
import { InputNumber } from 'antd';

const enhance = compose(
  withNotation,
  withHandlers({
    handleChange: props => deadTimeMs => {
      const notation = Object.assign(props.notation.state, { deadTimeMs });
      props.notation.dispatch.setNotation(notation);
    }
  })
);

const DeadTime = ({ notation, handleChange }) => (
  <div>
    <h3>Dead Time ms</h3>
    <InputNumber
      step={1}
      disabled={!notation.state.durationMs}
      value={notation.state.deadTimeMs}
      precision={0}
      onChange={handleChange}
    />
  </div>
);

export default enhance(DeadTime);
