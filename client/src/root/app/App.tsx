import React from 'react';
import { connect } from 'react-redux';

import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US.js';

// styles
import './reset.scss';
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
          {this.props.children}
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
