import { Line, CaretRenderer } from 'services';

class LoopCaretRenderer extends CaretRenderer {
  posX: Array<number> = [0, 0];

  // override
  protected _renderCaret(): LoopCaretRenderer {
    return this;
  }
}

export default LoopCaretRenderer;
