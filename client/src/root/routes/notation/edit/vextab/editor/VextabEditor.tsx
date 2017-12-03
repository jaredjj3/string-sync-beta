import React from 'react';
import { compose } from 'recompose';
import { Input, Alert } from 'antd';
import { withTab, withNotation } from 'enhancers';
import { Tab, Notation } from 'types';
import dupNotation from 'stringSyncUtil/dup/notation';

const { TextArea } = Input;

interface VextabEditorProps {
  tab: Tab;
  notation: Notation;
  setNotation(nextNotation): void;
}

interface VextabEditorState {}

class VextabEditor extends React.Component<VextabEditorProps, VextabEditorState> {
  componentWillReceiveProps(nextProps: VextabEditorProps): void {
    if (nextProps.tab.provider && !nextProps.tab.provider.editMode) {
      nextProps.tab.provider.editMode = true;
    }
  }

  handleChange = (e: React.SyntheticEvent<any>): void => {
    const vextabString = (e.target as any).value;
    const nextNotation = dupNotation(this.props.notation);
    nextNotation.vextabString = vextabString;
    this.props.setNotation(nextNotation);
  }

  render(): JSX.Element {
    const { provider } = this.props.tab;
    const { vextabString } = this.props.notation;
    const parseError = provider ? provider.parseError : null;

    return (
      <div className="VextabEditor">
        <div style={{ marginBottom: '20px' }}>
          {
            parseError ?
              <Alert
                message="Parse Error"
                description={parseError}
                type="error"
              /> :
              <Alert
                message="Parse Success"
                description="No errors :)"
                type="success"
              />
          }
        </div>
        <TextArea
          className="VextabEditor__textarea"
          placeholder="Write Vextab here..."
          value={vextabString}
          autosize={{ minRows: 10, maxRows: 20 }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const enhance = compose(
  withTab,
  withNotation
);

export default enhance(VextabEditor);
