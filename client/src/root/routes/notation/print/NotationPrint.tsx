import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';
import { withFeatures, withNotation } from 'enhancers';

const notationId = (props) => (
  props.match.params.id
);

const fetchNotation = (props) => {
  const id = notationId(props);
  if (props.notation.id !== id) {
    props.fetchNotation(id);
  }
};

const enhance = compose(
  withRouter,
  withFeatures,
  withNotation,
  lifecycle({
    componentDidMount(): void {
      this.props.disableFeatures(['navbar']);
      fetchNotation(this.props);
    },
    componentWillUnmount(): void {
      this.props.enableFeatures(['navbar']);
    }
  })
);

const NotationPrint = (props) => (
  <div className="NotationPrint">
    <div>
      <Link to={`/n/${notationId(props)}/`}>
        back
      </Link>
    </div>
    NotationPrint
  </div>
);

export default enhance(NotationPrint);
