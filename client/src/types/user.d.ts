export interface User {
  id: number;
  email: string;
  username: string;
  roles: string[];
  loggedIn: boolean;
  savedNotations: Array<number | string>;
}