import * as React from 'react';
import { compose, withState, withProps, lifecycle } from 'recompose';
import { withFretboard } from 'enhancers';
import * as classNames from 'classnames';

const enhance = compose(
  withFretboard,
  withState('lit', 'setLit', false),
  withState('pressed', 'setPressed', false),
  withProps(props => ({
    rootClassNames: classNames(
      'String',
      {
        'String--lit': props.lit,
        'String--pressed': props.pressed,
        'String--hidden': !props.lit && !props.pressed,
        'String--thin': props.string <= 3,
        'String--thick': props.string > 3
      }
    )
  })),
  lifecycle({
    componentDidMount(): void {
      const { fretboard, string, fret } = this.props;
      fretboard.state.instance.addGuitarString(string, this.props);
    },
    componentWillReceiveProps(nextProps: any): void {
      const { fretboard, string, fret } = nextProps;
      const fretboardService = fretboard.state.instance;
      const guitarString = fretboardService.selectGuitarString(string);

      if (guitarString === null) {
        fretboardService.addGuitarString(string, this.props);
      }
    },
    componentWillUnmount(): void {
      const { fretboard, string, fret } = this.props;
      fretboard.state.instance.removeGuitarString(string, this.props);
    }
  })
);

const String = ({ rootClassNames }) => <div className={rootClassNames} />;

export default enhance(String);
