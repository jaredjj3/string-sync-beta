import * as React from 'react';
import { compose } from 'recompose';
import { BrowserRouter } from 'react-router-dom';
import enUS from 'antd/lib/locale-provider/en_US.js';
import { LocaleProvider } from 'antd';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <LocaleProvider locale={enUS}>
        <main>
          test test
        </main>
      </LocaleProvider>
    </BrowserRouter>
  </div>
);

const enhance = compose(

);

export default enhance(App);
