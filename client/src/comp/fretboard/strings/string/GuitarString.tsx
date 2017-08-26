import React from 'react';

interface GuitarStringProps {
  string: number;
}

interface GuitarStringState {
  lit: boolean;
}

class GuitarString extends React.PureComponent<GuitarStringProps, GuitarStringState> {
  state: GuitarStringState = {
    lit: false
  };

  render(): JSX.Element {
    const guitarStringClassName = [
      'GuitarString',
      this.state.lit ? 'GuitarString--lit' : '',
      this.props.string <= 3 ? 'GuitarString--thin' : 'GuitarString--thick'
    ].join(' ').trim();

    return (
      <div className={guitarStringClassName}></div>
    );
  }
}

export default GuitarString;
