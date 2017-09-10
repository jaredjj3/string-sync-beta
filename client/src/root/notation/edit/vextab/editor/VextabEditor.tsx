import React from 'react';
import { connect } from 'react-redux';

interface VextabEditorProps {}

interface VextabEditorState {}

class VextabEditor extends React.Component<VextabEditorProps, VextabEditorState> {
  render(): JSX.Element {
    return (
      <div>
        VextabEditor
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VextabEditor);
