import * as React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';

const enhance = compose(
  withNotation,
  withProps(props => ({
    fetchNotation: async () => {
      const notationId = props.match.params.id;
      await props.notation.dispatch.fetchNotation(notationId);
    }
  })),
  lifecycle({
    componentDidMount(): void {
      this.props.fetchNotation();
    },
    componentWillUmount(): void {
      this.props.notation.dispatch.resetNotation();
    }
  })
);

const NotationStudio = () => (
  <div>
    NotationStudio
  </div>
);

export default enhance(NotationStudio);