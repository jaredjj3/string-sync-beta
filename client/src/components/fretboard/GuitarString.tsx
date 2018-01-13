import * as React from 'react';
import { compose, mapProps, withState, withProps, lifecycle } from 'recompose';
import { withFretboard } from 'enhancers';
import * as classNames from 'classnames';

const enhance = compose(
  withFretboard,
  mapProps(props => ({
    fretboard: props.fretboard.state.instance,
    string: props.string
  })),
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
      const { fretboard, string } = this.props;
      fretboard.addGuitarString(string, this.props);
    },
    componentWillReceiveProps(nextProps: any): void {
      const { fretboard, string } = nextProps;
      const guitarString = fretboard.selectGuitarString(string);

      if (guitarString === null) {
        fretboard.addGuitarString(string, this.props);
      }
    },
    componentWillUnmount(): void {
      const { fretboard, string } = this.props;
      fretboard.removeGuitarString(string, this.props);
    }
  })
);

const GuitarString = ({ rootClassNames }) => <div className={rootClassNames} />;

export default enhance(GuitarString);
