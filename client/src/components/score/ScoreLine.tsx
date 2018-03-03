import * as React from 'react';
import { compose, withHandlers, lifecycle } from 'recompose';
import { Overlap, Layer, Caret, LoopCarets } from 'components';
import { Element as ScrollElement } from 'react-scroll';
import { ScoreLineRenderer } from 'services';
import styled from 'styled-components';

const enhance = compose(
  withHandlers({
    handleCanvasRef: ({ line }) => canvas => {
      if (!canvas) {
        return;
      }

      const { maestro } = window.ss;
      const { score } = line;

      try {
        const renderer = new ScoreLineRenderer(line, canvas, maestro);
        renderer.render();

        if (line.isLast && maestro.errors.length === 0) {
          maestro.enqueue(() => {
            score.hydrateNotes();
          });
        }
      } catch (error) {
        maestro.errors.push(error);
      }
    }
  })
);

const Outer = styled.div`
  height: 280px;
  margin: 0 10px;
`;

const ScoreLine = ({ line, caret, handleCanvasRef }) => (
  <Outer className="ScoreLine">
    <ScrollElement name={`score-line-${line.number}`} />
    <Overlap>
      <Layer style={{ zIndex: '10' }}>
        <canvas ref={handleCanvasRef} />
      </Layer>
      <Layer style={{ zIndex: '11' }}>
        {caret ? <Caret line={line} /> : null}
      </Layer>
      <Layer style={{ zIndex: '12' }}>
        {caret ? <LoopCarets line={line} /> : null}
      </Layer>
    </Overlap>
  </Outer>
);

export default enhance(ScoreLine);
