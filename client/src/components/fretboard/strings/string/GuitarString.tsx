import React from 'react';
import { connect } from 'react-redux';

import { Fretman } from 'services/vexflow';
import { withTab } from 'enhancers';

interface GuitarStringProps {
  string: number;
  provider: any;
}

interface GuitarStringState {
  lit: boolean;
}

class GuitarString extends React.PureComponent<GuitarStringProps, GuitarStringState> {
  state: GuitarStringState = { lit: false };

  componentDidMount(): void {
    this.props.provider.fretman.addString(this);
  }

  light = (e?: React.SyntheticEvent<any>): void => {
    if (!this.state.lit) {
      this.setState(Object.assign({}, this.state, { lit: true }));
    }
  }

  unlight = (e?: React.SyntheticEvent<any>): void => {
    if (this.state.lit) {
      this.setState(Object.assign({}, this.state, { lit: false }));
    }
  }

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

export default withTab(GuitarString);
