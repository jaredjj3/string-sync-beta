import * as API from './api';

export const RECEIVE_TAGS = 'RECEIVE_TAGS';

export const receiveTags = (tags: Array<string>) => ({
  type: RECEIVE_TAGS,
  tags
});

export const fetchTags = (() => {
  let isFetching = false;

  return () => async dispatch => {
    const { notifyAll } = window as any;

    if (isFetching) {
      return;
    }

    isFetching = true;

    try {
      const tags = await API.fetchTags();
      dispatch(receiveTags(tags));
    } catch ({ responseJSON }) {
      notifyAll('Tags', responseJSON);
    } finally {
      isFetching = false;
    }
  };
})();
