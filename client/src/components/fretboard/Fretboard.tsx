import * as React from 'react';
import { compose, lifecycle, withState, withProps, shouldUpdate } from 'recompose';
import { Row, Col } from 'antd';
import Frets from './Frets';
import Strings from './Strings';
import { withFretboard, withViewport, withSync, textWhileLoading } from 'enhancers';
import { Fretboard as FretboardService, FretboardPlan } from 'services';
import { Overlap } from 'components';
import * as classNames from 'classnames';

const { Layer } = Overlap;

const enhance = compose(
  withFretboard,
  withViewport,
  withSync,
  withState('loading', 'setLoading', true),
  shouldUpdate((currProps, nextProps) => (
    currProps.viewport.state.type !== nextProps.viewport.state.type ||
    currProps.fretboard.state.instance !== nextProps.fretboard.state.instance ||
    currProps.loading !== nextProps.loading
  )),
  withProps(props => ({
    rootClassNames: classNames(
      'Fretboard',
      {
        'Fretboard--mobile': props.viewport.state.type === 'MOBILE',
        'Fretboard--desktop': props.viewport.state.type === 'DESKTOP'
      }
    )
  })),
  lifecycle({
    componentDidMount(): void {
      const fretboard = new FretboardService();
      this.props.fretboard.dispatch.setFretboard(fretboard);

      const fretboardPlan = new FretboardPlan(fretboard);
      this.props.sync.state.maestro.plans.fretboardPlan = fretboardPlan;
    },
    componentWillReceiveProps(nextProps: any): void {
      const loading = nextProps.fretboard.state.instance === null;
      nextProps.setLoading(loading);
    },
    componentWillUnmount(): void {
      this.props.fretboard.dispatch.resetFretboard();
    }
  })
);

const FretboardIndicators = () => {
  const indicators = Frets.DOTS.map((dots, fret) => (
    dots > 0 || fret === 0 ? fret.toString() : null
  ));

  return (
    <Row className="Fret__indicator" type="flex" justify="center">
      {
        indicators.map((indicator, fret) => (
          <Col key={`fret-indicator-${fret}`} span={fret === 0 ? 2 : 1}>
            <Row type="flex" justify="center">
              {indicator}
            </Row>
          </Col>
        ))
      }
    </Row>
  );
};

const Fretboard = ({ loading, rootClassNames }) => {
  if (loading) {
    return (
      <div className={rootClassNames}>
        Loading...
      </div>
    );
  } else {
    return (
      <div className={rootClassNames}>
        <FretboardIndicators />
        <Overlap>
          <Layer>
            <Frets />
          </Layer>
          <Layer>
            <Strings />
          </Layer>
        </Overlap>
      </div>
    );
  }
};

export default enhance(Fretboard);
