import * as React from 'react';
import { compose, withState, mapProps, withProps, withHandlers } from 'recompose';
import { withNotation, withViewport, withRaf } from 'enhancers';
import { Score } from 'models';

const enhance = compose(
  withNotation,
  withState('focusedNote', 'setFocusedNote', null),
  withProps(props => ({
    shouldCreateScore: () => (
      !props.score ||
      props.score.vextabString !== props.notation.state.vextabString ||
      props.score.width !== props.width
    )
  })),
  withHandlers({
    handleAnimationLoop: props => () => {
      const { note } = window.ss.maestro.snapshot.data.score;
      const { focusedNote } = props;

      if (focusedNote && focusedNote.renderer.currentStyle !== 'DEFAULT') {
        focusedNote.renderer.setStyle('DEFAULT').redraw();
      }

      if (note && !note.isRest && note.renderer.currentStyle !== 'ACTIVE') {
        note.renderer.setStyle('ACTIVE').redraw();
      }

      if (note !== focusedNote) {
        props.setFocusedNote(note);
      }
    }
  }),
  withRaf(
    () => window.ss.rafLoop,
    props => ({
      name: 'Score.handleAnimationLoop',
      precedence: 4,
      onAnimationLoop: props.handleAnimationLoop
    })
  )
);

const ScoreController = () => null;

export default enhance(ScoreController);
