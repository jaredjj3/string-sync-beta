import React from 'react';
import { compose } from 'recompose';
import { Button } from 'antd';
import { withNotation } from 'enhancers';
import { Notation } from 'types';

interface SaveProps {
  notation: Notation;
  updateNotation(notation: Notation): void;
}

interface SaveState {}

class Save extends React.Component<SaveProps, SaveState> {
  handleSaveButtonClick = (): void => {
    this.props.updateNotation(this.props.notation);
  }

  shouldComponentUpdate(nextProps: SaveProps): boolean {
    return false;
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

const enhance = compose(
  withNotation
);

export default enhance(Save);
