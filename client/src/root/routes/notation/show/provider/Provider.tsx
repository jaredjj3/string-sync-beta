import React from 'react';
import { connect } from 'react-redux';
import {
  compose, branch, defaultProps, renderComponent,
  lifecycle, onlyUpdateForKeys
} from 'recompose';

import { identity, withTab, withNotation, withVideo } from 'enhancers';
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

  componentWillUnmount(): void {
    this.props.resetTab();
  }

  updateProviderInternals(props: any): void {
    const { provider, vextab, tempo, deadTime, viewportWidth } = props;

    provider.vextab        = vextab;
    provider.bpm           = tempo;
    provider.deadTime      = deadTime;
    provider.viewportWidth = viewportWidth;

    if (provider.shouldTrySetup) {
      provider.setup();
    }
  }

  get shouldRenderChildren(): boolean {
    const { provider } = this.props;
    return provider && provider.isReady;
  }

  renderChildren(): JSX.Element {
    return (
      <div className="TabProvider">
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

const mapStateToProps = state => ({
  viewportWidth: state.device.viewport.width
});

const mapDispatchToProps = dispatch => ({

});

export default compose(
  withTab,
  withNotation,
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForKeys(['updatedAt', 'vextab', 'deadTime', 'tempo', 'viewportWidth'])
)(Provider);
