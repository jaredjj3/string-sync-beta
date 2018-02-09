import { DirectiveHandler } from './';

// A directive is an inline JSON string that is parsed from a vextab string. The purpose
// of this class is to take a raw JSON string and parse it into meaningful data that can
// be consumed and acted upon an instance of a DirectiveHandler object.

// This class is written in such a manner that the directive object keeps track of if the
// handler executed or not. This directs the responsibility of deciding of whether a directive
// should execute to the DirectiveObject itself.
class DirectiveObject {
  struct: Directive.Structs;
  refs: Directive.Refs;
  type: string;
  handler: DirectiveHandler = null;
  didExec: boolean = false;

  constructor(struct: Directive.Structs, refs: Directive.Refs) {
    this.struct = struct;
    this.refs = refs;

    if (!this.struct.type) {
      throw new Error('a directive struct must have a type');
    } else {
      this.type = struct.type;
    }
  }

  exec(): boolean {
    try {
      if (this.didExec) {
        throw new Error('a directive can only exec once');
      }
      this.handler = new DirectiveHandler(this);
      this.didExec = this.handler.exec();
    } catch (error) {
      console.error(error);
    }

    return this.didExec;
  }
}

export default DirectiveObject;
