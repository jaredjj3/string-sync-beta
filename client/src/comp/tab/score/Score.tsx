import React from 'react';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import { VexTab, Artist, Flow, Formatter } from 'services/vexflow';

import { Device } from 'types/device';

const { Renderer } = Flow;

interface ScoreProps {
  device: Device;
}

interface ScoreState {}

const test = `
options
space=20

tabstave
notation=true
key=B
time=4/4
clef=none
notes =|| :q (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^:q 7V/4 |
notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :h p5/4
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

  renderScore(): void {
    const { viewport } = this.props.device;

    const artist = new Artist(10, 0, viewport.width - 10, { scale: 1.0 });
    const tab = new VexTab(artist);

    try {
      tab.parse(test);
      const formatted = this.formatter.update(test, 2, tab.elements);
      artist.render(this.renderer);
      this.renderTabText(artist.staves.map(stave => stave.tab));
    } catch (e) {
      // console.error(e);
    }
  }

  renderTabText(tabStaves: any): void {
    this.ctx.save();
    this.ctx.font = '24px sans-serif';

    tabStaves.map(({ y }) => {
      const x = 20;
      this.ctx.fillText('T', x, y + 73);
      this.ctx.fillText('A', x, y + 93);
      this.ctx.fillText('B', x, y + 113);
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

const mapStateToProps = state => ({
  device: state.device
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Score);
