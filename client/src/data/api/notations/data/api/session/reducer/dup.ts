const dup = session => {
  const currentUser = Object.assign({}, session.currentUser);
  return Object.assign({}, session, { currentUser });
};

export default dup;
