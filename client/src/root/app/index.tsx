import React from 'react';
import ReactDOM from 'react-dom';

import Button from 'comp/button';
import 'antd/dist/antd.less';

interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  props: AppProps;
  state: AppState;

  render(): JSX.Element {
    return (
      <Button type="primary">
        Click me!
      </Button>
    );
  }
}

export default App;
