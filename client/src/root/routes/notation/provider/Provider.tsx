import React from 'react';
import { compose, renderComponent, lifecycle } from 'recompose';
import VideoSync from './videoSync';
import { withTab, withNotation, withVideo, withViewport } from 'enhancers';
import { VexProvider } from 'services/vexflow';

class Provider extends React.Component<any, any> {
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
    }
  }

  get shouldRenderChildren(): boolean {
    const { provider } = this.props.tab;
    return provider && provider.isReady;
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

export default enhance(Provider);
