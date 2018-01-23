import { connect } from 'react-redux';
import { videoActions as actions } from 'data/ui/video';

const mapStateToProps = ({ video }) => ({
  video
});

const mapDispatchToProps = dispatch => ({
  setPlayer: player => dispatch(actions.setPlayer(player)),
  setPlayerState: playerState => dispatch(actions.setPlayerState(playerState)),
  resetVideo: () => dispatch(actions.resetVideo()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  video: {
    state: stateProps.video,
    dispatch: dispatchProps
  }
});

const withVideo = Component => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);

export default withVideo;
