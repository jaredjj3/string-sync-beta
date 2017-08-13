import getNullUser from 'util/getNullUser';

export default {
  session: {
    currentUser: (window as any).currentUser || getNullUser()
  }
};
