import { uniq } from 'lodash';

export const NOTES: Array<string> = [
  'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'
];

export const ALT_FLAT_NOTE_NAMES: any = {
  'Ab': 'G#',
  'A' : null,
  'Bb': 'A#',
  'B' : null,
  'C' : null,
  'Db': 'C#',
  'D' : null,
  'Eb': 'D#',
  'E' : null,
  'F' : null,
  'Gb': 'F#',
  'G' : null
};

export const ALT_SHARP_NOTE_NAMES: any = {
  'G#': 'Ab',
  'A' : null,
  'A#': 'Bb',
  'B' : null,
  'C' : null,
  'C#': 'Db',
  'D' : null,
  'D#': 'Eb',
  'E' : null,
  'F' : null,
  'F#': 'Gb',
  'G' : null
};

export const VALID_NOTES: Array<any> = [
  'Ab', 'A' , 'A#',
  'Bb', 'B' ,
  'C' , 'C#',
  'Db', 'D' , 'D#',
  'Eb', 'E' ,
  'F' , 'F#',
  'Gb', 'G' , 'G#'
];

export const TUNING_BASE_NOTES_BY_TUNING_NAME: any = {
  'standard': ['E', 'B', 'G', 'D', 'A', 'E'],
  'dropd'   : ['E', 'B', 'G', 'D', 'A', 'D'],
  'dadgad'  : ['D', 'A', 'G', 'D', 'A', 'D']
};
