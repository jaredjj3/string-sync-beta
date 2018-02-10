import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers, withProps, withState, withPropsOnChange, lifecycle } from 'recompose';
import { Input, Alert } from 'antd';
import { withTab, withNotation } from 'enhancers';
import { debounce } from 'lodash';
import styled from 'styled-components';

const { TextArea } = Input;

let setNotationVextabString = (props: any) => {
  const vextabString = props.editorVextabString;
  const notation = Object.assign({}, props.notation.state);
  notation.vextabString = vextabString;
  props.notation.dispatch.setNotation(notation);
};

setNotationVextabString = debounce(setNotationVextabString, 250);

const enhance = compose(
  withTab,
  withNotation,
  withRouter,
  withState('editorVextabString', 'setEditorVextabString', null),
  withState('isInitialized', 'setIsInitialized', false),
  withProps(props => ({
    getParseError: () => {
      const tab = props.tab.state.instance;
      return tab ? tab.error : null;
    }
  })),
  withProps(props => ({
    setNotationVextabString: () => {
      setNotationVextabString(props);
    }
  })),
  withHandlers({
    handleChange: props => event => {
      props.setEditorVextabString(event.target.value);
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps: any): void {
      const idFromParams = parseInt(nextProps.match.params.id, 10);
      const isNotationFetched = idFromParams === nextProps.notation.state.id
      const notationVextabString = nextProps.notation.state.vextabString;
      const editorVextabString = nextProps.editorVextabString;

      if (isNotationFetched) {
        if (!nextProps.isInitialized) {
          nextProps.setEditorVextabString(nextProps.notation.state.vextabString);
          nextProps.setIsInitialized(true);
        } else if (notationVextabString !== editorVextabString) {
          nextProps.setNotationVextabString();
        }
      }
    }
  })
);

const VextabStringEditorOuter = styled.div`
  opacity: 1;

  & > div {
    margin-bottom: 20px;
  }
`;

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

const VextabStringEditor = ({ getParseError, editorVextabString, handleChange }) => (
  <VextabStringEditorOuter>
    <ParseError parseError={getParseError()} />
    <TextArea
      placeholder="Write Vextab here..."
      value={editorVextabString}
      autosize={{ minRows: 5, maxRows: 10 }}
      onChange={handleChange}
    />
  </VextabStringEditorOuter>
);

export default enhance(VextabStringEditor);
