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
        'GuitarString--thin': props.string <= 3,
        'GuitarString--thick': props.string > 3
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

const GuitarStringOuter = styled.div`
  .GuitarString {
    width: 100vw;
    background: #aaa;
    opacity: 0.4;
  }

  .GuitarString--hidden {
    transition: all 200ms ease-in;
  }

  .GuitarString--thin {
    height: 1px;
  }

  .GuitarString--thick {
    height: 2px;
  }

  .GuitarString--pressed {
    background: #fc354c;
  }
`;

const GuitarString = ({ rootClassNames }) => (
  <GuitarStringOuter>
    <div className={rootClassNames}></div>
  </GuitarStringOuter>
);

export default enhance(GuitarString);
