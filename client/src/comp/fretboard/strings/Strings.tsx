import React from 'react';

interface StringsProps {}

interface StringsState {}

class Strings extends React.Component<StringsProps, StringsState> {
  render(): JSX.Element {
    return (
      <div className="Strings">
        Strings
      </div>
    );
  }
}

export default Strings;
