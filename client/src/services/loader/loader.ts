import { last } from 'lodash';

// If the Loader has any tasks, then the LoadingMask component will be
// shown. That's it.
class Loader {
  static SHOW_FALLBACK_LINK_TIMEOUT_MS: number = 3000;

  component: any = null;
  setTimeoutId: number = null;
  tasks: Set<string> = new Set();

  get isVisible(): boolean {
    return this.component.props.isVisible;
  }

  add(task: string): Set<string> {
    if (this.tasks.has(task)) {
      console.warn(`task '${task}' is already present in the loader`);
    }

    this.tasks.add(task);

    if (this.component) {
      this._show();
    }

    return this.tasks;
  }

  complete(task: string): Set<string> {
    this.tasks.delete(task);

    if (this.tasks.size === 0) {
      this._hide();
    }

    return this.tasks;
  }

  clear(): Loader {
    return this._hide();
  }

  private _show(): Loader {
    if (!this.isVisible) {
      this.component.props.setVisibility(true);

      if (this.setTimeoutId === null) {
        this._armFallbackLink();
      }
    }

    return this;
  }

  private _hide(): Loader {
    if (this.isVisible) {
      this.component.props.setVisibility(false);
    }

    this._disarmFallbackLink();
    this._hideFallbackLink();
    this.tasks.clear();

    return this;
  }

  private _armFallbackLink(): Loader {
    this.setTimeoutId = window.setTimeout(
      this._showFallbackLink,
      Loader.SHOW_FALLBACK_LINK_TIMEOUT_MS
    );

    return this;
  }

  private _disarmFallbackLink(): Loader {
    window.clearTimeout(this.setTimeoutId);
    this.setTimeoutId = null;

    return this;
  }

  private _showFallbackLink = () => {
    this.component.props.setFallbackLinkVisibility(true);
    this.setTimeoutId = null;
  }

  private _hideFallbackLink = () => {
    this.component.props.setFallbackLinkVisibility(false);
  }
}

const instance = new Loader();

export default instance;
