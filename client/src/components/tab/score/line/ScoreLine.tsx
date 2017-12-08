import React from 'react';
import { compose } from 'recompose';
import { withTab } from 'enhancers';
import { Flow, VexTab } from 'services/vexflow';
import { Tab } from 'types';

const { Renderer } = Flow;

interface ScoreLineProps {
  vextab: VexTab;
  provider: any;
  lineNum: number;
  tab: Tab;
}

class ScoreLine extends React.Component<ScoreLineProps, any> {
  static HEIGHT_PX: number = 300;

  canvas: HTMLCanvasElement = null;
  ctx: CanvasRenderingContext2D = null;
  renderer: any = null;

  componentDidMount(): void {
    window.scoreLines = window.scoreLines || [];
    window.scoreLines.push(this);
  }

  resize (): void {
    const { canvas } = this;

    const ratio = window.devicePixelRatio || 1;
    const width = this.props.vextab.artist.width;
    const height = ScoreLine.HEIGHT_PX;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }

  setCanvas = (c: HTMLCanvasElement): void => {
    if (!c) {
      return;
    }

    this.canvas = c;
    this.renderer = new Renderer(c, Renderer.Backends.CANVAS);
    this.ctx = this.renderer.getContext();
    this.resize();
    this.renderTab();
    this.maybeSetupTickman();
  }

  shouldComponentUpdate(nextProps: ScoreLineProps): boolean {
    return this.props.vextab !== nextProps.vextab;
  }

  renderTabText(): void {
    this.ctx.save();
    this.ctx.font = '24px sans-serif';

    this.props.vextab.artist.staves.map(stave => {
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

    const { lineNum } = this.props;

    const barNotePosX = this.
        props.
        vextab.
        artist.
        staves[0].
        note_notes.
        filter(note => note.attrs.type === 'BarNote').
        map(barNote => barNote.getAbsoluteX()).
        forEach((x, ndx) => {
          const measuresPerLine = this.props.tab.provider.formatter.measuresPerLine;
          const measureNum = (measuresPerLine * lineNum) + ndx + 1;
          this.ctx.fillText(measureNum, x - 3, 50);
      });

    this.ctx.restore();
  }

  renderTab = (): void => {
    if (this.renderer !== null) {
      this.props.vextab.artist.render(this.renderer);
      this.renderMeasureNumbers();
      this.renderTabText();
    }
  }

  maybeSetupTickman = (): void => {
    const { provider } = this.props.tab;
    const shouldSetupTickman = provider.vextabs.every(vextab => vextab.artist.rendered);

    if (shouldSetupTickman) {
      provider._setupTickman();
    }
  }

  render(): JSX.Element {
    this.renderTab();

    return (
      <div className="ScoreLine">
        <canvas ref={this.setCanvas} />
      </div>
    );
  }
}

export default compose(
  withTab
)(ScoreLine);
