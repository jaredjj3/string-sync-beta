import { last } from 'lodash';

class Loader {
  static SHOW_FALLBACK_LINK_TIMEOUT_MS: number = 3000;

  component: any = null;
  setTimeoutId: number = null;

  get isVisible(): boolean {
    return this.component.props.isVisible;
  }

  show(theme: string): Loader {
    if (!this.isVisible) {
      this.component.props.setVisibility(true);
    }

    if (this.setTimeoutId === null) {
      this._armFallbackLink();
    }

    return this;
  }

  hide(): Loader {
    if (this.isVisible) {
      this.component.props.setVisibility(false);
    }

    this._disarmFallbackLink();
    this._hideFallbackLink();

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
