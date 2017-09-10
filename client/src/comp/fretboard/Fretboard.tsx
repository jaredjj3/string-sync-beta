import React from 'react';
import { connect } from 'react-redux';

import Frets from './frets';
import Strings from './strings';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import { Player, Fretman } from 'services/vexflow';
import { isVideoActive } from 'util/videoStateCategory';

interface FretboardProps {
  shouldRAF: boolean;
  tabPlayer: Player;
  fretman: Fretman;
}

interface FretboardState {}

const fretIndicators = Object.assign([], Frets.DOTS).map((dots, fret) => (
  dots > 0 || fret === 0 ? fret.toString() : null
));

class Fretboard extends React.Component<FretboardProps, FretboardState> {
  static FRET_INDICATORS: Array<string> = fretIndicators;

  RAFHandle: number = null;

  componentWillReceiveProps(nextProps: FretboardProps): void {
    if (nextProps.shouldRAF) {
      this.RAFHandle = window.requestAnimationFrame(() => {
        this.updateFretman(nextProps.fretman, nextProps.tabPlayer);
      });
    }
  }

  updateFretman = (fretman: Fretman, tabPlayer: Player): void => {

    try {
      fretman.updateWithPlayer(tabPlayer);
    } catch (e) {
      // noop
    }

    if (this.props.shouldRAF) {
      this.RAFHandle = window.requestAnimationFrame(() => {
        this.updateFretman(fretman, tabPlayer);
      });
    } else {
      window.cancelAnimationFrame(this.RAFHandle);
      this.RAFHandle = null;
    }
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

const mapStateToProps = state => ({
  shouldRAF: (
    state.video.player &&
    state.tab.player.isReady &&
    state.tab.fretman &&
    isVideoActive(state.video.state)
  ),
  tabPlayer: state.tab.player,
  fretman: state.tab.fretman
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fretboard);
