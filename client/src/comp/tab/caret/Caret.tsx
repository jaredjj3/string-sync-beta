import React from 'react';

interface CaretProps {}

interface CaretState {
  shouldRAF: boolean;
}

class Caret extends React.Component<CaretProps, CaretState> {
  render(): JSX.Element {
    return (
      <div>
        Caret
      </div>
    );
  }
}

export default Caret;
