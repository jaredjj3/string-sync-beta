import React from 'react';
import { connect } from 'react-redux';

import { Input } from 'antd';

const { TextArea } = Input;

interface VextabEditorProps {
  vextab: string;
  updateVextab(vextab: string): void;
}

interface VextabEditorState {}

class VextabEditor extends React.PureComponent<VextabEditorProps, VextabEditorState> {
  shouldComponentUpdate(nextProps: VextabEditorProps): boolean {
    return this.props.vextab !== nextProps.vextab;
  }

  handleChange = (e: React.SyntheticEvent<any>): void => {
    this.props.updateVextab((e.target as any).value);
  }

  render(): JSX.Element {
    const { vextab } = this.props;

    return (
      <div className="VextabEditor">
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
  vextab: state.notation.vextab
});

const mapDispatchToProps = dispatch => ({
  updateVextab: vextab => dispatch(updateVextab(vextab))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VextabEditor);
