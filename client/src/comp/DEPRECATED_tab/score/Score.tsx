import React from 'react';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import ScoreScroller from './scroller';
import { VexTab, Artist, Flow, Formatter, VexPlayer, Tickman } from 'services/vexflow';

import { Viewport } from 'types/device';

const { Renderer } = Flow;

interface ScoreProps {
  viewportWidth: number;
  measuresPerLine: number;
  numMeasures: number;
  vextab: string;
  tabPlayer: VexPlayer;
  tabFormatter: Formatter;
  tempo: number;
  tickman: any;
  setMeasuresPerLine(measuresPerLine: number): void;
  setNumMeasures(numMeasures: number): void;
  setArtist(artist: Artist): void;
  resetTab(): void;
  setTabParseError(parseError: string): void;
  clearTabParseError(): void;
}

interface ScoreState {}

class Score extends React.Component<ScoreProps, ScoreState> {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  renderer: any;
  artist: Artist;

  componentWillReceiveProps(nextProps: ScoreProps): void {
    nextProps.tabFormatter.width = nextProps.viewportWidth;
  }

  shouldComponentUpdate(nextProps: ScoreProps): boolean {
    return (
      this.props.measuresPerLine !== nextProps.measuresPerLine ||
      this.props.numMeasures !== nextProps.numMeasures ||
      this.props.viewportWidth !== nextProps.viewportWidth ||
      this.props.vextab !== nextProps.vextab ||
      this.props.tempo !== nextProps.tempo
    );
  }

  componentDidUpdate(): void {
    const { tabFormatter } = this.props;

    this.renderScore();

    if (this.artist) {
      const { tabPlayer, setArtist } = this.props;

      this.maybeSetMeasuresPerLine(tabFormatter.measuresPerLine);
      this.maybeSetNumMeasures(tabFormatter.numMeasures);
      setArtist(this.artist);
      this.renderTabText(this.artist);
      this.renderMeasureNumbers();
    }
  }

  componentWillUnmount(): void {
    this.props.resetTab();
  }

  setCanvas = (c: HTMLCanvasElement): void => {
    if (!c || (this.canvas && this.ctx)) {
      return;
    }

    this.canvas = c;
    this.renderer = new Renderer(c, Renderer.Backends.CANVAS);
    this.ctx = this.renderer.getContext();
  }

  maybeSetMeasuresPerLine = (measuresPerLine: number): void => {
    if (measuresPerLine !== this.props.measuresPerLine) {
      this.props.setMeasuresPerLine(measuresPerLine);
    }
  }

  maybeSetNumMeasures = (numMeasures: number): void => {
    if (numMeasures !== this.props.numMeasures) {
      this.props.setNumMeasures(numMeasures);
    }
  }

  renderTabText(artist: Artist): void {
    this.ctx.save();
    this.ctx.font = '24px sans-serif';

    artist.staves.map(stave => {
      let x = 25;
      let y = stave.tab.y + 73;
      this.ctx.fillText('T', x, y);
      this.ctx.fillText('A', x, y + 20);
      this.ctx.fillText('B', x, y + 40);
    });

    this.ctx.restore();
  }

  renderMeasureNumbers(): void {
    this.ctx.save();
    this.ctx.fillStyle = 'darkgray';
    this.ctx.font = 'italic 10px arial';

    this.props.tickman.barTicks.forEach((barTick, ndx) => {
      let x = barTick.posX;
      let y = barTick.posY;
      this.ctx.fillText(ndx, x - 3, y + 33);
    });

    this.ctx.restore();
  }

  renderScore(): void {
    const { viewportWidth, tabFormatter, vextab, setTabParseError, clearTabParseError } = this.props;

    if (vextab.length === 0) {
      return;
    }

    const preArtist = new Artist(0, 0, viewportWidth);
    const unformattedTab = new VexTab(preArtist);

    try {
      unformattedTab.parse(vextab);
      const formattedVextab = tabFormatter.process(unformattedTab.elements);

      const postArtist = new Artist(
        10, 20, viewportWidth - 50, { tab_stave_lower_spacing: 300 }
      );
      const formattedTab = new VexTab(postArtist);
      formattedTab.parse(formattedVextab);

      postArtist.render(this.renderer);
      this.artist = postArtist;

      clearTabParseError();
    } catch (error) {
      setTabParseError(error.message);
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <ScoreScroller />
        <canvas ref={this.setCanvas} />
      </div>
    );
  }
}

import {
  setMeasuresPerLine,
  setNumMeasures,
  setArtist,
  resetTab,
  setTabParseError,
  clearTabParseError
} from 'data/tab/actions';

const mapStateToProps = state => ({
  viewportWidth: state.device.viewport.width,
  measuresPerLine: state.tab.measuresPerLine,
  numMeasures: state.tab.numMeasures,
  vextab: state.notation.vextab,
  tempo: state.notation.tempo,
  tabPlayer: state.tab.vexPlayer,
  tabFormatter: state.tab.formatter,
  tickman: state.tab.tickman
});

const mapDispatchToProps = dispatch => ({
  setMeasuresPerLine: (measuresPerLine: number) => dispatch(setMeasuresPerLine(measuresPerLine)),
  setNumMeasures: (numMeasures: number) => dispatch(setNumMeasures(numMeasures)),
  setArtist: (artist: Artist) => dispatch(setArtist(artist)),
  resetTab: () => dispatch(resetTab()),
  setTabParseError: (parseError: string) => dispatch(setTabParseError(parseError)),
  clearTabParseError: () => dispatch(clearTabParseError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Score);