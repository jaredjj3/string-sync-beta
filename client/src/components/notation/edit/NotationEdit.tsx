import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withProps, lifecycle } from 'recompose';
import { Gradient, Maestro, Video, Nav, Fretboard, Tab } from 'components';
import { withNotation } from 'enhancers';

const enhance = compose(
  withNotation,
  withProps(props => ({
    setBodyColor: backgroundColor => {
      window.$('body').css('background-color', backgroundColor);
    }
  })),
  lifecycle({
    componentDidMount(): void {
      this.props.setBodyColor('black');

      const notationId = this.props.match.params.id;
      this.props.notation.dispatch.fetchNotation(notationId);
    },
    componentWillUnmount(): void {
      this.props.setBodyColor('white');
    }
  })
);

const NotationEdit = () => (
  <div className="NotationEdit">
    <Nav />
    <Maestro />
    <Gradient />
    <Video />
    <Fretboard />
    <Tab allowOverflow />
  </div>
);

export default enhance(NotationEdit);
