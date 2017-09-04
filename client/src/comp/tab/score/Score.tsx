import React from 'react';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import { VexTab, Artist, Flow, Formatter } from 'services/vexflow';

import { Device } from 'types/device';

const { Renderer } = Flow;

interface ScoreProps {
  device: Device;
  measuresPerLine: number;
  setMeasuresPerLine(measuresPerLine: number): void;
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
text :w, |#segno, ,|, :hd, , #tr

tabstave
notation=true
key=A
time=4/4
clef=none

notes :q (5/4.5/5) (7/4.7/5)s(5/4.5/5) ^3^
notes :8 7-5/4 $.a./b.$ (5/4.5/5)h(7/5) =:|
notes :8 (12/5.12/4)ds(5/5.5/4)u 3b4/5
notes :h (5V/6.5/4.6/3.7/2) $.italic.let ring$ =|=

text :h, ,.font=Times-12-italic, D.S. al coda, |#coda
text :h, ,.-1, .font=Arial-14-bold,A13
text ++, .23, #f
`;

class Score extends React.PureComponent<ScoreProps, ScoreState> {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  renderer: any;
  formatter: Formatter;

  constructor(props: ScoreProps) {
    super(props);

    this.formatter = new Formatter();
  }

  componentDidUpdate(): void {
    this.renderScore();
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
      this.renderTabText(artist.staves.map(stave => stave.tab));
    } catch (e) {
      console.error(e);
    }

    this.maybeSetMeasuresPerLine(this.formatter.measuresPerLine);
  }

  renderTabText(tabStaves: any): void {
    this.ctx.save();
    this.ctx.font = '24px sans-serif';

    tabStaves.map(({ y }) => {
      const x = 25;
      this.ctx.fillText('T', x, y + 94);
      this.ctx.fillText('A', x, y + 114);
      this.ctx.fillText('B', x, y + 134 );
    });

    this.ctx.restore();
  }

  render(): JSX.Element {
    console.log('FIXME: do not render unecessarily');

    return (
      <div>
        <canvas ref={this.setCanvas} />
      </div>
    );
  }
}

import { setMeasuresPerLine } from 'data/tab/actions';

const mapStateToProps = state => ({
  device: state.device,
  measuresPerLine: state.tab.measuresPerLine
});

const mapDispatchToProps = dispatch => ({
  setMeasuresPerLine: (measuresPerLine: number) => dispatch(setMeasuresPerLine(measuresPerLine))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Score);
