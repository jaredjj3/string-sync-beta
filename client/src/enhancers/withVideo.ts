import { connect } from 'react-redux';

import { resetVideo } from 'data/video/actions';
import { isVideoActive } from 'util/videoStateCategory';

const mapStateToProps = state => ({
  videoPlayer: state.video.player,
  videoState: state.video.state,
  videoLoop: state.video.loop,
  isVideoActive: isVideoActive(state.video.state)
});

const mapDispatchToProps = dispatch => ({
  resetVideo: () => dispatch(resetVideo())
});

const withVideo = (Component: any) => connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default withVideo;
