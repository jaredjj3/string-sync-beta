import * as React from 'react';
import { compose, withHandlers } from 'recompose';
import { Overlap, Layer, Caret, LoopCarets } from 'components';
import { Element as ScrollElement } from 'react-scroll';

const enhance = compose(
  withHandlers({
    handleCanvasRef: props => canvas => {
      props.line.canvas = canvas;
    }
  })
);

const ScoreLine = ({ line, caret, handleCanvasRef }) => (
  <div className="ScoreLine">
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
  </div>
);

export default enhance(ScoreLine);
