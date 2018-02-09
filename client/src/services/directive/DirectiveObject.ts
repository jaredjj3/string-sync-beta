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

  constructor(struct: Directive.Structs, refs: Directive.Refs) {
    this.struct = struct;
    this.refs = refs;

    this.handler = new DirectiveHandler(this);

    if (!this.struct.type) {
      throw new Error('a directive struct must have a type');
    } else {
      this.type = struct.type;
    }
  }

  exec(handlerBehavior: Directive.HandlerBehaviors): boolean {
    this.handler.behavior = handlerBehavior;
    const didExec = this.handler.exec();
    this.handler.behavior = 'PASSIVE';
    return didExec;
  }
}

export default DirectiveObject;
