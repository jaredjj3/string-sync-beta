import * as React from 'react';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { withNotations } from 'enhancers';
import { Nav } from 'components';
import LibraryContent from './content';

const Library = ({ isLoading }) => (
  <div id="Library" className="Library">
    <Nav />
    <LibraryContent isLoading={isLoading} />
  </div>
);

const shouldFetchNotations = (notations): boolean => notations.state.length === 0;

const enhance = compose(
  withNotations,
  withState('isLoading', 'setLoading', true),
  withHandlers({
    startLoading: ({ setLoading }) => () => setLoading(true),
    stopLoading: ({ setLoading }) => () => setLoading(false)
  }),
  lifecycle({
    componentDidMount: async (): Promise<void> => {
      const { startLoading, notations, stopLoading } = this.props;
      if (shouldFetchNotations(notations)) {
        startLoading();
        await notations.dispatch.fetchNotations();
        stopLoading();
      }
    }
  })
);

export default enhance(Library);
