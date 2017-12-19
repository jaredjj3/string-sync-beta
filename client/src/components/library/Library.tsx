import * as React from 'react';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { withNotations } from 'enhancers';
import { Nav, Footer } from 'components';
import LibraryContent from './content';

const enhance = compose(
  withNotations,
  withState('isLoading', 'setLoading', true),
  withHandlers({
    startLoading: ({ setLoading }) => () => setLoading(true),
    stopLoading: ({ setLoading }) => () => setLoading(false)
  }),
  lifecycle({
    async componentDidMount(): Promise<void> {
      const { startLoading, notations, stopLoading, isLoading } = this.props;
      const shouldFetchNotations = notations.state.length === 0;

      if (shouldFetchNotations) {
        if (!isLoading) {
          startLoading();
        }
        await notations.dispatch.fetchNotations();
      }

      stopLoading();
    }
  })
);

const Library = ({ isLoading }) => (
  <div id="Library" className="RouteEntry Library">
    <Nav />
    <LibraryContent isLoading={isLoading} />
    <Footer />
  </div>
);

export default enhance(Library);
