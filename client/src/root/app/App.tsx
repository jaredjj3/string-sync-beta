import React from 'react';
import { connect } from 'react-redux';

import AppLayout from './layout';
import Layout from 'antd/lib/layout';
import Icon from 'antd/lib/icon';
import DesktopNav from 'comp/desktop/nav';
import MobileNav from 'comp/mobile/nav';

import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US.js';

import { Device } from 'types/device';
import { Location } from 'types/location';

import 'antd-mobile/dist/antd-mobile.less';
import 'antd/dist/antd.less';
import './_app.less';

const { Header, Content, Footer } = Layout;

interface AppProps {
  children: React.ReactChildren;
  location: Location;
  device: Device;
  queryDevice(): void;
  updateViewport(): void;
}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  private updateViewportHandle: number;

  componentWillMount(): void {
    const { queryDevice, updateViewport } = this.props;

    queryDevice();
    updateViewport();
  }

  componentDidMount(): void {
    addEventListener('resize', this.dispatchUpdateViewport);
  }

  render(): JSX.Element {
    const { location, children, device } = this.props;

    return (
      <LocaleProvider locale={enUS}>
        <AppLayout location={location} device={device} >
          {children}
        </AppLayout>
      </LocaleProvider>
    );
  }

  // This function prevents the updateViewport function from being called too frequently.
  // There are certain components, such as the ReactYouTube video component that must reload
  // in order to change its video's dimensions, which is imperative to this app.
  private dispatchUpdateViewport = (e: Event): void => {
    window.clearTimeout(this.updateViewportHandle);

    // For some reason, certain scrolling actions trigger a window resize event
    // on the Chrome browser on the iPhone 6. Therefore, avoid rerendering the
    // screen if a mobile device is detected.
    if (this.props.device.isTouch) {
      return;
    }

    this.updateViewportHandle = window.setTimeout(this.updateViewport, 10);
  }

  private updateViewport = (): void => {
    this.props.updateViewport();
    window.clearTimeout(this.updateViewportHandle);
  }
}

import { queryDevice, updateViewport } from 'data/device/actions';

const mapStateToProps = state => ({
  device: state.device,
});

const mapDispatchToProps = dispatch => ({
  queryDevice: () => dispatch(queryDevice()),
  updateViewport: () => dispatch(updateViewport())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
