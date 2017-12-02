import API from '../api';
import { ignoreIfExecuting } from 'stringSyncUtil';

export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const RESET_TAGS = 'RESET_TAGS';

export const receiveTags = (tags: Array<string>) => ({
  type: RECEIVE_TAGS,
  tags
});

export const resetTags = () => ({
  type: RESET_TAGS
});

export const fetchTags = ignoreIfExecuting(user => async dispatch => {
  try {
    const tags = await API.fetchTags();
    dispatch(receiveTags(tags));
  } catch (error) {
    window.notification.error({
      message: 'Tags',
      description: 'something went wrong',
      duration: 2
    });
  }
});
