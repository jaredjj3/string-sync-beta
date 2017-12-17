import { reduxConnect } from 'stringSyncUtil';
import { viewportActions as actions } from 'data/ui/viewport';

const withViewport = reduxConnect(
  state => ({
    viewport: state.viewport
  }),
  dispatch => ({
    setViewport: viewport => dispatch(actions.setViewport(viewport))
  })
);

export default withViewport;
