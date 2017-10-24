import React from 'react';
import { connect } from 'react-redux';

import Button from 'antd/lib/button';

interface SaveProps {
  updateNotation(): void;
}

interface SaveState {}

class Save extends React.Component<SaveProps, SaveState> {
  handleSaveButtonClick = (): void => {
    this.props.updateNotation();
  }

  render(): JSX.Element {
    return (
      <Button
        size="large"
        type="primary"
        icon="save"
        onClick={this.handleSaveButtonClick}
      >
        Save
      </Button>
    );
  }
}

import { updateNotation } from 'data/notation/actions';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  updateNotation: () => dispatch(updateNotation())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Save);
