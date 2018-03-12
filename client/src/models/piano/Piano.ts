import { PianoKey } from './';

class Piano {
  pianoKeysByNote: any = {};
  lit: Set<PianoKey> = new Set();
  pressed: Set<PianoKey> = new Set();
  justPressed: Set<PianoKey> = new Set();

  update(lightNotes: Array<string>, pressNotes: Array<string>, justPressNotes: Array<string>): Piano {
    const lightKeys = lightNotes.map(note => this.pianoKeysByNote[note.toUpperCase()]);
    const pressKeys = pressNotes.map(note => this.pianoKeysByNote[note.toUpperCase()]);
    const justPressKeys = justPressNotes.map(note => this.pianoKeysByNote[note.toUpperCase()]);

    const lit = new Set();
    const pressed = new Set();
    const justPressed = new Set();

    lightKeys.forEach(key => {
      if (!key) {
        return;
      }

      if (!this.lit.has(key)) {
        key.light();
      }

      lit.add(key);
    });

    pressKeys.forEach(key => {
      if (!key) {
        return;
      }

      if (!this.pressed.has(key)) {
        key.press();
      }

      pressed.add(key);
    });

    justPressKeys.forEach(key => {
      if (!key) {
        return;
      }

      if (!this.justPressed.has(key)) {
        key.justPress();
      }

      justPressed.add(key);
    });

    // Unlight the components not newly pressed nor lit.
    const shouldUnlight = Array.from(this.lit).filter(key => !lit.has(key));
    const shouldUnpress = Array.from(this.pressed).filter(key => !pressed.has(key));
    const shouldUnjustPress = Array.from(this.justPressed).filter(key => !justPressed.has(key));

    shouldUnlight.forEach(key => key.unlight());
    shouldUnpress.forEach(key => key.unpress());
    shouldUnjustPress.forEach(key => key.unJustPress());

    this.lit = lit;
    this.pressed = pressed;
    this.justPressed = justPressed;
    
    return this;
  }

  addPianoKey(note: string, pianoKeyProps: any): PianoKey {
    const upperNote = note.toUpperCase();
    const pianoKey = new PianoKey(upperNote, pianoKeyProps);
    this.pianoKeysByNote[upperNote] = pianoKey;
    return pianoKey;
  }

  removePianoKey(note: string): PianoKey {
    const upperNote = note.toUpperCase();
    const pianoKey = this.pianoKeysByNote[upperNote];
    delete this.pianoKeysByNote[upperNote];
    return pianoKey;
  }
}

export default Piano;
