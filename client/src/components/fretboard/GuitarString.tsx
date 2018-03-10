import * as React from 'react';
import { compose, withState, withProps, lifecycle } from 'recompose';
import * as classNames from 'classnames';
import styled from 'styled-components';

const enhance = compose(
  withState('lit', 'setLit', false),
  withState('pressed', 'setPressed', false),
  withProps(props => ({
    rootClassNames: classNames(
      'GuitarString',
      {
        'GuitarString--lit': props.lit,
        'GuitarString--pressed': props.pressed,
        'GuitarString--hidden': !props.lit && !props.pressed,
        'GuitarString--thin': [0, 1, 2].includes(props.string),
        'GuitarString--thick': [3, 4, 5].includes(props.string)
      }
    )
  })),
  lifecycle({
    componentDidMount(): void {
      const { string } = this.props;
      window.ss.maestro.fretboard.addGuitarString(string, this.props);
    },
    componentWillReceiveProps(nextProps: any): void {
      const { string } = nextProps;
      const { fretboard } = window.ss.maestro;
      const guitarString = fretboard.selectGuitarString(string);

      if (guitarString === null) {
        fretboard.addGuitarString(string, this.props);
      }
    },
    componentWillUnmount(): void {
      const { string } = this.props;
      window.ss.maestro.fretboard.removeGuitarString(string);
    }
  })
);

const Outer = (styled.div as any)`
  width: 100%;

  .GuitarString {
    background: #eee;
    box-shadow: 0 0 1px 1px #222;
    opacity: ${props => props.type === 'MOBILE' ? 0.6 : 0.9};
  }

  .GuitarString--hidden {
    transition: all 200ms ease-in;
  }

  .GuitarString--thin {
    height: 1px;
    margin-top: -1px;
    background: #6e6e6e;
  }

  .GuitarString--thick {
    height: 2px;
    margin-top: -2px;
    background: #878787;
  }

  .GuitarString--pressed {
    background: #fc354c;
  }
`;

const GuitarString = ({ type, rootClassNames }) => (
  <Outer type={type}>
    <div className={rootClassNames}></div>
  </Outer>
);

export default enhance(GuitarString);
