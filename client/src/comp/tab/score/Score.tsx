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
tabstave
notation=false
clef=none

notes :q (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |
notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :h p5/4 |
notes :q (5/4.5/5) (7/4.7/5)s(5/4.5/5) ^3^ |
notes :8 7-5/4 $.a./b.$ (5/4.5/5)h(7/5) =:|
notes :8 (12/5.12/4)ds(5/5.5/4)u 3b4/5 |
notes :h (5V/6.5/4.6/3.7/2) $.italic.let ring$ =|=
text :w, what, ,|, :hd, , #tr
`;

class Score extends React.PureComponent<ScoreProps, ScoreState> {
  scoreCanvas: HTMLCanvasElement;

  componentDidUpdate(): void {
    const { viewport } = this.props.device;

    const renderer = new Renderer(this.scoreCanvas, Renderer.Backends.CANVAS);
    const artist = new Artist(10, 30, 1500, { scale: 1.0 });
    const tab = new VexTab(artist);

    try {
      tab.parse(test);
      artist.render(renderer);
    } catch (e) {
      console.error(e);
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <canvas ref={c => this.scoreCanvas = c} />
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
