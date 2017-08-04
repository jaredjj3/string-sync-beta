import React from 'react';
import { connect } from 'react-redux';

import Layout from 'comp/layout';
const { Header, Content } = Layout;
import Icon from 'comp/icon';
import DesktopNav from 'comp/desktop/nav';

import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US.js';

// styles
import 'antd/dist/antd.less';

interface AppProps {
  children: React.ReactChildren;
}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  props: AppProps;
  state: AppState;

  render(): JSX.Element {
    return (
      <LocaleProvider locale={enUS}>
        <div>
          <DesktopNav />
          {this.props.children}
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
