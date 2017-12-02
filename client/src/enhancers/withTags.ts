import { reduxConnect } from 'stringSyncUtil';
import { tagsActions as actions } from 'data/api/tags';

const withTags = reduxConnect(
  state => ({
    tags: state.tags
  }),
  dispatch => ({
    setTags: tags => dispatch(actions.setTags(tags)),
    resetTags: () => dispatch(actions.resetTags()),
    fetchTags: () => dispatch(actions.fetchTags())
  })
);

export default withTags;
