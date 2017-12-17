import { User } from 'types';

const isLoggedIn = (user: User) => user.id !== null && user.id > -1;

export default isLoggedIn;
