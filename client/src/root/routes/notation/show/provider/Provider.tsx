import React from 'react';
import { connect } from 'react-redux';
import {
  compose, branch, defaultProps, renderComponent,
  lifecycle
} from 'recompose';

import { identity, withTab } from 'enhancers';
import { VexProvider } from 'services/vexflow';

class Provider extends React.Component<any, any> {
  componentDidMount(): void {
    const provider = new VexProvider();
    provider.afterSetup = this.props.emitUpdate;
    this.props.setProvider(provider);
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
  provider: state.tab.provider
});

const mapDispatchToProps = dispatch => ({

});

export default compose(
  withTab,
  connect(mapStateToProps, mapDispatchToProps),
)(Provider);
