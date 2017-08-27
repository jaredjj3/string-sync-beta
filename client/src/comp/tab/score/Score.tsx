import React from 'react';

import vextab from 'vextab/releases/vextab-div.js';

interface CaretProps {}

interface CaretState {}

class Caret extends React.PureComponent<CaretProps, CaretState> {
  rootDiv: HTMLDivElement;

  componentDidMount(): void {
    const VexTab = vextab.VexTab;
    const Artist = vextab.Artist;
    const Renderer = vextab.Flow.Renderer;

    // Create VexFlow Renderer from canvas element with id #boo.
    const renderer = new Renderer(this.rootDiv, Renderer.Backends.CANVAS);

    // For SVG, you can use the following line (make sure #boo is a div element)
    // renderer = new Renderer($('#boo')[0], Renderer.Backends.SVG);

    // Initialize VexTab artist and parser.
    const artist = new Artist(10, 10, 600, {scale: 1.0});
    const tab = new VexTab(artist);

    try {
        // Parse VexTab music notation passed in as a string.
        tab.parse('tabstave notation=true\n notes :q 4/4\n');

        // Render notation onto canvas.
        artist.render(renderer);
    } catch (e) {
        console.log(e);
    }
  }

  render(): JSX.Element {
    return (
      <canvas ref={c => this.rootDiv = c}>

      </canvas>
    );
  }
}

export default Caret;
