import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import Frets from './frets';
import Strings from './strings';
import { Row, Col } from 'antd';
import { VexPlayer, Fretman, VexProvider } from 'services/vexflow';
import { withRaf, withTab, identity, withFeatures } from 'enhancers';
import { Tab, RAF } from 'types';

interface FretboardProps {
  isFretboardEnabled: boolean;
  raf: RAF;
  vexPlayer: VexPlayer;
  fretman: Fretman;
  provider: VexProvider;
  tab: Tab;
}

interface FretboardState {}

const fretIndicators = Object.assign([], Frets.DOTS).map((dots, fret) => (
  dots > 0 || fret === 0 ? fret.toString() : null
));

class Fretboard extends React.Component<FretboardProps, FretboardState> {
  static FRET_INDICATORS: Array<string> = fretIndicators;

  componentDidMount(): void {
    this.registerRAFLoop();
  }

  componentWillUnmount(): void {
    this.props.tab.provider.fretman.reset();
    this.unregisterRAFLoop();
  }

  updateFretman = (): void => {
    try {
      this.props.tab.provider.updateFretmanWithPlayer();
    } catch (error) {
      console.error(error);
    }
  }

  registerRAFLoop = (): void => {
    const RAFLoop = this.props.raf.loop;

    if (!RAFLoop.has('Fretboard.updateFretman')) {
      RAFLoop.register({
        name: 'Fretboard.updateFretman',
        precedence: 0,
        onAnimationLoop: this.updateFretman
      });
    }
  }

  unregisterRAFLoop = (): void => {
    this.props.raf.loop.unregister('Fretboard.updateFretman');
  }

  render(): JSX.Element {
    return (
      <div className="FretboardContainer">
        <Row type="flex" justify="center" className="Fret__indicator">
          {
            Fretboard.FRET_INDICATORS.map((indicator, fret) => (
              <Col key={`fret-indicator-${fret}`} span={fret === 0 ? 2 : 1}>
                <Row type="flex" justify="center">
                  {indicator}
                </Row>
              </Col>
            ))
          }
        </Row>
        <div className="Fretboard">
          <Frets />
          <Strings />
        </div>
      </div>
    );
  }
}

const enhance = compose(
  withFeatures,
  withRaf,
  withTab,
  branch(
    ({ features }) => features.fretboard,
    identity,
    renderNothing
  )
);

export default enhance(Fretboard);
