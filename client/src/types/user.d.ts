export interface User {
  id: number;
  email: string;
  username: string;
  roles: string[];
  isLoggedIn: boolean;
  savedNotations: Array<number | string>;
}