import { User } from 'types/user';

const getNullUser = () => ({
  id: -1,
  email: '',
  username: '',
  roles: ['student'],
  isLoggedIn: false,
  savedNotations: []
});

export default getNullUser;
