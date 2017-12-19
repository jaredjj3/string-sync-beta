import * as React from 'react';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { withNotations } from 'enhancers';
import { LoadingText } from 'components';

const Library = ({ isLoading }) => (
  <div id="Library" className="Library">
    <LoadingText isLoading={isLoading} />
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
      this.props.startLoading();
      await this.props.notations.dispatch.fetchNotations();
      this.props.stopLoading();
    }
  })
);

export default enhance(Library);
