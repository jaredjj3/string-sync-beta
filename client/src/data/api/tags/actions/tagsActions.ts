import API from '../api';
import { ignoreIfExecuting } from 'stringSyncUtil';

export const SET_TAGS = 'SET_TAGS';
export const RESET_TAGS = 'RESET_TAGS';

export const setTags = (tags: Array<string>) => ({
  type: SET_TAGS,
  tags
});

export const resetTags = () => ({
  type: RESET_TAGS
});

export const fetchTags = ignoreIfExecuting(user => async dispatch => {
  try {
    const tags = await API.fetchTags();
    dispatch(setTags(tags));
  } catch (error) {
    window.notification.error({
      message: 'Tags',
      description: 'something went wrong',
      duration: 2
    });
  }
});
