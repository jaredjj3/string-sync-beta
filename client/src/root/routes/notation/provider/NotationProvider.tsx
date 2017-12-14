import React from 'react';
import { compose, renderComponent, lifecycle } from 'recompose';
import VideoSync from './videoSync';
import { withTab, withNotation, withVideo, withViewport } from 'enhancers';
import { VexProvider } from 'services/vexflow';

// The purpose of the notation provider is to defer the rendering of
// its children until the store tab.provider.isReady returns true.
// This prevents the need for the children to check for null/undefined
// values everywhere before consuming the data.
class NotationProvider extends React.Component<any, any> {
  componentDidMount(): void {
    const provider = new VexProvider();
    provider.afterSetup = this.props.emitUpdate;
    this.props.setProvider(provider);
  }

  componentWillReceiveProps(nextProps: any): void {
    this.updateProviderInternals(nextProps);
  }

  shouldComponentUpdate(nextProps: any): boolean {
    return (
      this.props.tab.updatedAt !== nextProps.tab.updatedAt ||
      this.props.viewport.type !== nextProps.viewport.type
    );
  }

  componentWillUnmount(): void {
    this.props.resetTab();
  }

  updateProviderInternals(props: any): void {
    const { provider } = props.tab;
    const { vextabString, bpm, deadTimeMs } = props.notation;
    const viewportWidth = props.viewport.width;

    provider.vextabString  = vextabString;
    provider.bpm           = bpm;
    provider.deadTime      = deadTimeMs;
    provider.viewportWidth = viewportWidth;

    if (provider.shouldTrySetup) {
      provider.setup();
      provider._setupTickman();
    }
  }

  get shouldRenderChildren(): boolean {
    const { tab, notation } = this.props;
    const { provider } = tab;
    return (
      (provider && provider.isReady) ||
      // for new notations and notations with a broken vextab string
      (provider && !provider.shouldTrySetup && (provider.vextabString === '' || provider.parseError))
    );
  }

  renderChildren(): JSX.Element {
    return (
      <div className="TabProvider">
        <VideoSync />
        {this.props.children}
      </div>
    );
  }

  renderLoading(): JSX.Element {
    return (
      <div className="TabProvider">
        Loading...
      </div>
    );
  }

  render(): JSX.Element {
    if (this.shouldRenderChildren) {
      return this.renderChildren();
    } else {
      return this.renderLoading();
    }
  }
}

const enhance = compose(
  withTab,
  withNotation,
  withVideo,
  withViewport
);

export default enhance(NotationProvider);
