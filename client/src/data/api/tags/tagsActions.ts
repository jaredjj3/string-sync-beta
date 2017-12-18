import * as API from './tagsApi';
import * as constants from './tagsConstants';

export const setTags = (tags: Store.Tags) => ({
  type: constants.SET_TAGS,
  tags
});

export const resetTags = () => ({
  type: constants.RESET_TAGS
});

// TagsController#index
export const fetchTags = user => async dispatch => {
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
};
