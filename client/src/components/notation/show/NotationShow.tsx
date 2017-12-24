import * as React from 'react';
import { compose, withState, withProps, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { Gradient, Video, Tab } from 'components';
import NotationShowBanner from './NotationShowBanner';
import NotationShowControls from './NotationShowControls';

const enhance = compose(
  withNotation,
  withState('loading', 'setLoading', false),
  withProps(props => ({
    maybeFetchNotation: async () => {
      const notationId = props.match.params.id;

      if (props.notation.state.id !== notationId) {
        props.setLoading(true);
        await props.notation.dispatch.fetchNotation(notationId);
        props.setLoading(false);
      }
    }
  })),
  lifecycle({
    componentDidMount(): void {
      this.props.maybeFetchNotation();
    }
  })
);

const NotationShow = ({ loading, notation }) => (
  <div className="NotationShow">
    <Gradient />
    <NotationShowBanner
      loading={loading}
      songName={notation.state.songName}
      transcriber={notation.state.transcriber}
    />
    <Video />
    <Tab />
    <NotationShowControls />
  </div>
);

export default enhance(NotationShow);
