export interface User {
  id: number;
  email: string;
  username: string;
  roles: string[];
  savedNotations: Array<number | string>;
}