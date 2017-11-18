import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Banner from './banner';
import { withRAFLoop, withVideo } from 'enhancers';

interface NotationShowProps {
  match: any;
  RAFLoop: any;
  shouldRAF: boolean;
  fetchNotation(notationId: number): void;
  resetNotation(): void;
  showNav(): void;
  hideNav(): void;
  resetRAFLoop(): void;
}

interface NotationShowState {}

class NotationShow extends React.Component<NotationShowProps, NotationShowState> {
  componentDidMount(): void {
    const notationId = this.props.match.params.id;
    this.props.fetchNotation(notationId);
  }

  componentWillReceiveProps(nextProps: NotationShowProps): void {
    const { RAFLoop, shouldRAF } = nextProps;

    if (shouldRAF) {
      RAFLoop.start();
    } else {
      RAFLoop.stop();
    }
  }

  componentWillUnmount(): void {
    this.props.resetNotation();
    this.props.showNav();
    this.props.resetRAFLoop();
  }

  render(): JSX.Element {
    return (
      <div className="NotationShow">
        <Banner />
      </div>
    );
  }
}

import { fetchNotation, resetNotation } from 'data/notation/actions';
import { enableFeatures, disableFeatures } from 'data/feature/actions';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  fetchNotation: (notationId: number) => dispatch(fetchNotation(notationId)),
  resetNotation: () => dispatch(resetNotation()),
  showNav: () => dispatch(enableFeatures(['navbar'])),
  hideNav: () => dispatch(disableFeatures(['navbar']))
});

export default compose(
  withRAFLoop,
  withVideo,
  connect(mapStateToProps, mapDispatchToProps)
)(NotationShow);
