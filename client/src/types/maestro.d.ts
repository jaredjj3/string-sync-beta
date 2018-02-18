declare namespace Maestro {
  interface Options {
    showMoreNotes: boolean;
    showLoop: boolean;
    autoScroll: boolean;
  }

  type QueueCallback = (maestro?: any) => any
}
