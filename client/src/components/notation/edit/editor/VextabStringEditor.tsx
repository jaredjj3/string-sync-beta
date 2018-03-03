import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers, withProps, withState, withPropsOnChange, lifecycle } from 'recompose';
import { Input, Alert } from 'antd';
import { withNotation } from 'enhancers';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { hash } from 'ssUtil';

const { TextArea } = Input;

let setNotationVextabString = (props: any) => {
  const vextabString = props.editorVextabString;
  const notation = Object.assign({}, props.notation.state);
  notation.vextabString = vextabString;
  props.notation.dispatch.setNotation(notation);
};

setNotationVextabString = debounce(setNotationVextabString, 250);

const enhance = compose(
  withNotation,
  withRouter,
  withState('editorVextabString', 'setEditorVextabString', null),
  withState('isInitialized', 'setIsInitialized', false),
  withProps(props => ({
    parseErrors: window.ss.maestro.errors
  })),
  withProps(props => ({
    setNotationVextabString: nextProps => {
      setNotationVextabString(nextProps);
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
          nextProps.setEditorVextabString(notationVextabString);
          nextProps.setIsInitialized(true);
        } else if (this.props.notation.state.vextabString !== editorVextabString) {
          nextProps.setNotationVextabString(nextProps);
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

const ParseError = ({ parseErrors }) => {
  if (parseErrors.length > 0) {
    return (
      <Alert
        message="Parse Error"
        description={
          <ul>
            {parseErrors.map((error, ndx) => <li key={hash(error.message + ndx)}>{error.message}</li>)}
          </ul>
        }
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

const VextabStringEditor = ({ parseErrors, editorVextabString, handleChange }) => (
  <VextabStringEditorOuter>
    <ParseError parseErrors={parseErrors} />
    <TextArea
      placeholder="Write Vextab here..."
      value={editorVextabString}
      autosize={{ minRows: 5 }}
      onChange={handleChange}
    />
  </VextabStringEditorOuter>
);

export default enhance(VextabStringEditor);
