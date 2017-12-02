import { reduxConnect } from 'stringSyncUtil';
import { tabActions as actions } from 'data/ui/tab';

const withTab = reduxConnect(
  state => ({
    tab: state.tab
  }),
  dispatch => ({
    setProvider: provider => dispatch(actions.setProvider(provider)),
    emitUpdate: () => dispatch(actions.emitUpdate()),
    resetTab: () => dispatch(actions.resetTab())
  })
);

export default withTab;
