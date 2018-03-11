import * as React from 'react';
import { compose, withHandlers, withState, shouldUpdate } from 'recompose';
import { withRaf } from 'enhancers';
import { get } from 'lodash';
import styled from 'styled-components';

const NO_SUGGESTIONS_DESCRIPTION = 'no suggestions';

const enhance = compose(
  withState('description', 'setDescription', NO_SUGGESTIONS_DESCRIPTION),
  withHandlers({
    handleAnimationLoop: props => dt => {
      const { measure } = window.ss.maestro.snapshot.data.score;

      if (measure && window.ss.maestro.options.showMoreNotes) {
        const description = measure.noteSuggestions.map(suggestion => suggestion.description).join(", ");
        props.setDescription(description || NO_SUGGESTIONS_DESCRIPTION);
      } else {
        if (props.description) {
          props.setDescription('');
        }
      }
    }
  }),
  withRaf(
    () => window.ss.rafLoop,
    props => ({
      name: 'SuggestionNoteDescription.handleAnimationLoop',
      precedence: 9,
      onAnimationLoop: props.handleAnimationLoop
    })
  ),
  shouldUpdate((currProps, nextProps) => currProps.description !== nextProps.description)
);

const SuggestedNoteDescription = enhance(({ description }) => (
  <Outer>
    {description}
  </Outer>
));

const Outer = styled.div`
  color: fuchsia;
`;

export default SuggestedNoteDescription;
