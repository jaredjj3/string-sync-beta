import React from 'react';
import { connect } from 'react-redux';

import Button from 'antd/lib/button';
import { VexTab, Artist, Flow } from 'services/vexflow';

import { Device } from 'types/device';

const { Renderer } = Flow;

interface ScoreProps {
  device: Device;
}

interface ScoreState {}

const test = `
options space=20

tabstave
notation=true
key=B
time=4/4
clef=none
notes :q =|| (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |
notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :h p5/4

options space=40

tabstave
notation=true
key=A
time=4/4
clef=none
notes :q =|| (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |
notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :h p5/4
`;

class Score extends React.PureComponent<ScoreProps, ScoreState> {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  componentDidUpdate(): void {
    const { viewport } = this.props.device;

    const renderer = new Renderer(this.canvas, Renderer.Backends.CANVAS);
    const artist = new Artist(0, 0, viewport.width - 10, { scale: 1.0 });
    const tab = new VexTab(artist);

    try {
      tab.parse(test);
      artist.render(renderer);
      this.renderTabText(artist.staves.map(stave => stave.tab));
    } catch (e) {
      console.log(e);
    }
  }

  setCanvas = (c: HTMLCanvasElement): void => {
    if (!c || (this.canvas && this.ctx)) {
      return;
    }

    this.canvas = c;
    this.ctx = c.getContext('2d');
  }

  renderTabText(tabStaves: any): void {
    this.ctx.save();
    this.ctx.font = '24px sans-serif';

    tabStaves.map(({ start_x, y }) => {
      this.ctx.fillText('T', start_x - 14, y + 73);
      this.ctx.fillText('A', start_x - 14, y + 93);
      this.ctx.fillText('B', start_x - 14, y + 113);
    });

    this.ctx.restore();
  }

  render(): JSX.Element {
    console.log('rendered');

    return (
      <div style={{ paddingLeft: '10px' }}>
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
