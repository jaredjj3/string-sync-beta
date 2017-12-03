import { reduxConnect } from 'stringSyncUtil';
import { videoActions as actions } from 'data/ui/video';

const withVideo = reduxConnect(
  state => ({
    video: state.video
  }),
  dispatch => ({
    setPlayer: player => dispatch(actions.setPlayer(player)),
    setPlayerState: playerState => dispatch(actions.setPlayerState(playerState)),
    setLoop: loop => dispatch(actions.setLoop(loop)),
    resetVideo: () => dispatch(actions.resetVideo()),
  })
);

export default withVideo;
