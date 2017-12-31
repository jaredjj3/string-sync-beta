declare namespace PlanExecutions {
  interface Fretboard {
    lightPos: Array<any>;
    pressPos: Array<any>;
    currentNote: any;
  }

  interface Tab {
    currentLine: any;
    currentMeasure: any;
    currentNote: any;
  }

  interface Caret {
    caretRenderer: any;
    interpolator: any;
    tickRange: NumRange;
  }
}
