import * as React from 'react';
import { PianoKey } from './';
import styled from 'styled-components';

const NOTES: Array<string> = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

const nextNote = (noteWithOctave: string): string => {
  const noteOctave = noteWithOctave.split('/');
  const note = noteOctave[0].toUpperCase();
  const octave = parseInt(noteOctave[1], 10);
  
  return note === 'G#'
    ? `A/${octave + 1}`
    : `${NOTES[NOTES.indexOf(note) + 1]}/${octave}`
};

const PianoKeysOuter = styled.div`
  background: black;
`;
const PianoKeysInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow-x: scroll;
`;

const PianoKeys = () => {
  const startNote = 'A/0';
  const endNote = nextNote('C/8');
  let note = startNote;

  const pianoKeys = [];

  while (note !== endNote) {
    pianoKeys.push(<PianoKey key={`piano-key-${note}`} note={note} />);
    note = nextNote(note);
  }

  return (
    <PianoKeysOuter>
      <PianoKeysInner>
        {pianoKeys}
      </PianoKeysInner>
    </PianoKeysOuter>
  )
};

export default PianoKeys;
