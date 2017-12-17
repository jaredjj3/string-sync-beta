import * as React from 'react';
import { compose } from 'recompose';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <main>
        test
      </main>
    </BrowserRouter>
  </div>
);

const enhance = compose(

);

export default enhance(App);
