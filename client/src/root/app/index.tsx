import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';

interface AppProps {}

interface AppState { date: string }

class App extends React.Component<AppProps, AppState> {
  props: AppProps;
  state: AppState = { date: '' };

  handleChange = (date: any): void => {
    message.info('Selected Date: ' + date.toString());
    this.setState({ date });
  }

  render (): JSX.Element {
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>Date: {this.state.date.toString()}</div>
      </div>
    );
  }
}

export default App;
