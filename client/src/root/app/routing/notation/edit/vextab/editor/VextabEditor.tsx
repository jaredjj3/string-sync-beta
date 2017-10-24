import React from 'react';
import { connect } from 'react-redux';

import Input from 'antd/lib/input';
import Alert from 'antd/lib/alert';

const { TextArea } = Input;

interface VextabEditorProps {
  vextab: string;
  parseError: string;
  updateVextab(vextab: string): void;
  clearTabParseErrors(): void;
}

interface VextabEditorState {}

class VextabEditor extends React.Component<VextabEditorProps, VextabEditorState> {
  handleChange = (e: React.SyntheticEvent<any>): void => {
    this.props.updateVextab((e.target as any).value);
  }

  render(): JSX.Element {
    const { vextab, parseError } = this.props;

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
          value={vextab}
          autosize={{ minRows: 10, maxRows: 20 }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

import { updateVextab } from 'data/notation/actions';
import { clearTabParseError } from 'data/tab/actions';

const mapStateToProps = state => ({
  vextab: state.notation.vextab,
  parseError: state.tab.parseError
});

const mapDispatchToProps = dispatch => ({
  updateVextab: vextab => dispatch(updateVextab(vextab)),
  clearTabParseError: () => dispatch(clearTabParseError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VextabEditor);
