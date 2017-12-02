import { User } from 'types';

const getNullUser = (): User => ({
  id: null,
  email: null,
  username: null,
  roles: ['student'],
  savedNotations: []
});

export default getNullUser;
