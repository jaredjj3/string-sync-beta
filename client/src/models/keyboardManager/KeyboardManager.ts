import { hash } from 'utilities';

interface KeySpec {
  [key: number]: Function
}

// This class is a hack around React's keyboard handlers, as there is no great support
// for multiple key presses.
class KeyboardManager {
  scope: any = null;
  pressed: Set<string> = new Set();
  installed: boolean = false;

  private _specs: KeySpec = {};

  static specKey(keys: Array<string>): number {
    return hash(keys.sort().join());
  }
  
  install(scope: any): KeyboardManager {
    this.scope = scope;
    this.scope.onkeydown = this._handleKeyDown;
    this.scope.onkeyup = this._handleKeyUp;
    this.installed = true;

    return this;
  }

  uninstall(): KeyboardManager {
    this.scope.onkeydown = null;
    this.scope.onkeyup = null;
    this.scope = null;
    this.pressed = new Set();
    this._specs = {};
    this.installed = false;

    return this;
  }

  register(keys: Array<string>, onKeyPress: Function): KeyboardManager {
    this._specs[KeyboardManager.specKey(keys)] = onKeyPress;
    return this;
  }

  unregister(keys: Array<string>): KeyboardManager {
    this._specs[KeyboardManager.specKey(keys)] = null;
    return this;
  }

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.key) {
      this.pressed.add(event.key);
    }

    this._invokeCallback(event);
  }

  private _handleKeyUp = (event: KeyboardEvent) => {
    if (event.key) {
      this.pressed.delete(event.key);
    }
  }

  private _invokeCallback = (event: KeyboardEvent): void => {
    const key = KeyboardManager.specKey(Array.from(this.pressed));
    const callback = this._specs[key];

    if (typeof callback === 'function') {
      callback(event);
    }
  }
}

export default KeyboardManager;
