import React from 'react';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import { VexTab, Artist, Flow, Formatter, Player } from 'services/vexflow';
import { isEqual } from 'lodash';

import { Device } from 'types/device';
import { BuildStructs } from 'types/buildStructs';

const { Renderer } = Flow;

interface ScoreProps {
  device: Device;
  measuresPerLine: number;
  numMeasures: number;
  buildStructs: BuildStructs;
  tabPlayer: Player;
  setMeasuresPerLine(measuresPerLine: number): void;
  setNumMeasures(numMeasures: number): void;
  setArtist(artist: Artist): void;
  resetTab(): void;
}

interface ScoreState {}

const test = `
tabstave
notation=true
key=A
time=4/4
clef=none
notes =|: :q (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |
notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :h p5/4 $Fi,Ga,Ro!$

tabstave
notation=true
key=A
time=4/4
clef=none

notes :q (5/4.5/5) (7/4.7/5)s(5/4.5/5) ^3^
notes :8 7-5/4 $.a./b.$ (5/4.5/5)h(7/5) =:|
notes :8 (12/5.12/4)ds(5/5.5/4)u 3b4/5
notes :h (5V/6.5/4.6/3.7/2) $.italic.let ring$
notes =|: :q (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |
notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :h p5/4 $Fi,Ga,Ro!$
`;

class Score extends React.Component<ScoreProps, ScoreState> {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  renderer: any;
  formatter: Formatter;
  artist: Artist;

  constructor(props: ScoreProps) {
    super(props);

    this.formatter = new Formatter();
  }

  componentDidMount(): void {
    this.renderScore();
    this.maybeSetMeasuresPerLine(this.formatter.measuresPerLine);
    this.maybeSetNumMeasures(this.formatter.measures.length);
    this.props.setArtist(this.artist);
  }

  shouldComponentUpdate(nextProps: ScoreProps): boolean {
    return (
      this.props.measuresPerLine !== nextProps.measuresPerLine ||
      this.props.numMeasures !== nextProps.numMeasures ||
      !isEqual(this.props.device, nextProps.device)
      // TODO: after the seeds are fixed: this.props.buildStructs !== nextProps.buildStructs
    );
  }

  componentDidUpdate(): void {
    this.renderScore();
    this.maybeSetMeasuresPerLine(this.formatter.chunkSize);
    this.maybeSetNumMeasures(this.formatter.measures.length);
    this.props.setArtist(this.artist);
    this.props.tabPlayer.artist = this.artist;
  }

  componentWillUnmount(): void {
    this.props.resetTab();
  }

  setCanvas = (c: HTMLCanvasElement): void => {
    if (!c || (this.canvas && this.ctx)) {
      return;
    }

    this.canvas = c;
    this.ctx = c.getContext('2d');
    this.renderer = new Renderer(c, Renderer.Backends.CANVAS);
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
    const { viewport } = this.props.device;

    let artist = new Artist(10, 0, viewport.width - 10, { scale: 1.0 });
    let tab = new VexTab(artist);

    try {
      tab.parse(test);
      const formatted = this.formatter.update(test, viewport.width, tab.elements);

      artist = new Artist(10, 0, viewport.width - 10, { scale: 1.0 });
      tab = new VexTab(artist);
      tab.parse(formatted);

      artist.render(this.renderer);
      this.renderTabText(artist);
    } catch (e) {
      console.error(e);
    }

    this.artist = artist;
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

import { setMeasuresPerLine, setNumMeasures, setArtist, resetTab } from 'data/tab/actions';

const mapStateToProps = state => ({
  device: state.device,
  measuresPerLine: state.tab.measuresPerLine,
  numMeasures: state.tab.numMeasures,
  buildStructs: state.notation.buildStructs,
  tabPlayer: state.tab.player
});

const mapDispatchToProps = dispatch => ({
  setMeasuresPerLine: (measuresPerLine: number) => dispatch(setMeasuresPerLine(measuresPerLine)),
  setNumMeasures: (numMeasures: number) => dispatch(setNumMeasures(numMeasures)),
  setArtist: (artist: Artist) => dispatch(setArtist(artist)),
  resetTab: () => dispatch(resetTab())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Score);
