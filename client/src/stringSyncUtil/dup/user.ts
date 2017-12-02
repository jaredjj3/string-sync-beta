import { User } from 'types/user';
import getNullUser from 'util/getNullUser';

const dupUser = (user: User): User => {
  if (!user) {
    return getNullUser();
  }

  const nextUser = Object.assign({}, user);
  nextUser.savedNotations = Object.assign([], user.savedNotations);
  nextUser.roles = Object.assign([], user.roles);

  return nextUser;
};

export default dupUser;
