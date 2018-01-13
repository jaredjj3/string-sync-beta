import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { withNotations } from 'enhancers';
import { Nav, Footer, Gradient } from 'components';
import { LibraryContent } from './';
import { Icon } from 'antd';

const enhance = compose(
  withNotations,
  lifecycle({
    componentDidMount(): void {
      const { notations } = this.props;
      const shouldFetchNotations = notations.state.length === 0;

      if (shouldFetchNotations) {
        notations.dispatch.fetchNotations();
      }
    }
  })
);

const Library = () => (
  <div
    id="Library"
    className="Library"
    style={{ overflowX: 'hidden' }}
  >
    <Gradient />
    <Nav />
    <LibraryContent />
  </div>
);

export default enhance(Library);
