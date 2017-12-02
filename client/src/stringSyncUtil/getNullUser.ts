import { User } from 'types/user';

const getNullUser = () => ({
  id: null,
  email: null,
  username: null,
  roles: ['student'],
  savedNotations: []
});

export default getNullUser;
