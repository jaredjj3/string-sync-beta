import React from 'react';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
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

  componentDidUpdate(): void {
    const { tabFormatter } = this.props;

    this.renderScore();

    if (this.artist) {
      const { tabPlayer, setArtist } = this.props;

      this.maybeSetMeasuresPerLine(tabFormatter.measuresPerLine);
      this.maybeSetNumMeasures(tabFormatter.numMeasures);
      setArtist(this.artist);
      // tabPlayer.artist = this.artist;
      // tabPlayer.tempo = tempo;
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

  render(): JSX.Element {
    return (
      <div>
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
  tabFormatter: state.tab.formatter
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
