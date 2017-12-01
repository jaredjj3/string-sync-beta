import * as API from './api';

export const RECEIVE_TAGS = 'RECEIVE_TAGS';

export const receiveTags = (tags: Array<string>) => ({
  type: RECEIVE_TAGS,
  tags
});

export const fetchTags = (() => {
  let isFetching = false;

  return () => async dispatch => {

    if (isFetching) {
      return;
    }

    isFetching = true;

    try {
      const tags = await API.fetchTags();
      dispatch(receiveTags(tags));
    } catch (e) {
      window.notification.error({
        message: 'Tags',
        description: 'something went wrong'
      });
    } finally {
      isFetching = false;
    }
  };
})();
