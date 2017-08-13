import React from 'react';
import { connect } from 'react-redux';

import AppLayout from './layout';
import DesktopNav from 'comp/desktop/nav';
import Icon from 'antd/lib/icon';
import Layout from 'antd/lib/layout';
import LocaleProvider from 'antd/lib/locale-provider';
import MobileNav from 'comp/mobile/nav';
import enUS from 'antd/lib/locale-provider/en_US.js';

import { Device } from 'types/device';
import { Location } from 'types/location';
import { add, remove } from 'eventlistener';
import { debounce } from 'lodash';

import { User } from 'types/user';

const { Header, Content, Footer } = Layout;

interface AppProps {
  children: React.ReactChildren;
  location: Location;
  device: Device;
  queryDevice(): void;
  updateViewport(): void;
  receiveUser(user: User): void;
}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  maybeUpdateViewport: Function;

  constructor(props: AppProps) {
    super(props);

    this.maybeUpdateViewport = debounce(this._maybeUpdateViewport, 300, { maxWait: 600 });
  }
  componentWillMount(): void {
    const { queryDevice, updateViewport, receiveUser } = this.props;

    receiveUser((window as any).currentUser);
    queryDevice();
    updateViewport();
  }

  componentDidMount(): void {
    add(window, 'resize', this.maybeUpdateViewport);
  }

  componentWillUnmount(): void {
    remove(window, 'resize', this.maybeUpdateViewport);
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

  private _maybeUpdateViewport = (e: Event): void => {
    // For some reason, certain scrolling actions trigger a window resize event
    // on the Chrome browser on the iPhone 6. Therefore, avoid rerendering the
    // screen if a touch device is detected.
    if (this.props.device.isTouch) {
      return;
    }

    this.props.updateViewport();
  }
}

import { queryDevice, updateViewport } from 'data/device/actions';
import { receiveUser } from 'data/session/actions';

const mapStateToProps = state => ({
  device: state.device,
});

const mapDispatchToProps = dispatch => ({
  queryDevice: () => dispatch(queryDevice()),
  updateViewport: () => dispatch(updateViewport()),
  receiveUser: user => dispatch(receiveUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
