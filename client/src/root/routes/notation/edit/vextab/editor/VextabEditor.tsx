import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Input from 'antd/lib/input';
import Alert from 'antd/lib/alert';

const { TextArea } = Input;

interface VextabEditorProps {
  vextab: string;
  provider: any;
  updateVextab(vextab: string): void;
}

interface VextabEditorState {}

class VextabEditor extends React.Component<VextabEditorProps, VextabEditorState> {
  componentWillReceiveProps(nextProps: VextabEditorProps): void {
    if (nextProps.provider && !nextProps.provider.editMode) {
      nextProps.provider.editMode = true;
    }
  }

  handleChange = (e: React.SyntheticEvent<any>): void => {
    this.props.updateVextab((e.target as any).value);
  }

  render(): JSX.Element {
    const { vextab, provider } = this.props;
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
          value={vextab}
          autosize={{ minRows: 10, maxRows: 20 }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

import { updateVextab } from 'data/notation/actions';

const mapStateToProps = state => ({
  vextab: state.notation.vextab,
  provider: state.tab.provider
});

const mapDispatchToProps = dispatch => ({
  updateVextab: vextab => dispatch(updateVextab(vextab))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VextabEditor);
