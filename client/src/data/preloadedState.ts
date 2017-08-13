export default {
  session: { currentUser: (window as any).currentUser }
};

delete (window as any).currentUser;
