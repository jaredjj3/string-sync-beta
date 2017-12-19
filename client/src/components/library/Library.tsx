import * as React from 'react';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { withNotations } from 'enhancers';
import { Nav, Footer } from 'components';
import LibraryContent from './content';

const Library = ({ isLoading }) => (
  <div id="Library" className="Library">
    <Nav />
    <LibraryContent isLoading={isLoading} />
    <Footer />
  </div>
);

const enhance = compose(
  withNotations,
  withState('isLoading', 'setLoading', true),
  withHandlers({
    startLoading: ({ setLoading }) => () => setLoading(true),
    stopLoading: ({ setLoading }) => () => setLoading(false)
  }),
  lifecycle({
    async componentDidMount(): Promise<void> {
      const { startLoading, notations, stopLoading } = this.props;
      const shouldFetchNotations = notations.state.length === 0;

      if (shouldFetchNotations) {
        startLoading();
        await notations.dispatch.fetchNotations();
        stopLoading();
      }
    }
  })
);

export default enhance(Library);
