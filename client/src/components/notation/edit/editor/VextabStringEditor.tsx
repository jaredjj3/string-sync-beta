import * as React from 'react';
import { compose, withHandlers, withProps } from 'recompose';
import { Input, Alert } from 'antd';
import { withTab, withNotation } from 'enhancers';

const { TextArea } = Input;

const enhance = compose(
  withTab,
  withNotation,
  withProps(props => ({
    getParseError: () => {
      const tab = props.tab.state.instance;
      return tab ? tab.error : null;
    }
  })),
  withHandlers({
    handleChange: props => event => {
      const vextabString = event.target.value;
      const notation = Object.assign({}, props.notation.state);
      notation.vextabString = vextabString;
      props.notation.dispatch.setNotation(notation);
    }
  })
);

const ParseError = ({ parseError }) => {
  if (parseError) {
    return (
      <Alert
        message="Parse Error"
        description={parseError}
        type="error"
      />
    );
  } else {
    return (
      <Alert
        message="Parse Success"
        description="No parse errors :)"
        type="success"
      />
    )
  }
}

const VextabStringEditor = ({ getParseError, notation, handleChange }) => (
  <div className="VextabStringEditor">
    <ParseError parseError={getParseError()} />
    <TextArea
      placeholder="Write Vextab here..."
      value={notation.state.vextabString}
      autosize={{ minRows: 5, maxRows: 10 }}
      onChange={handleChange}
    />
  </div>
);

export default enhance(VextabStringEditor);
