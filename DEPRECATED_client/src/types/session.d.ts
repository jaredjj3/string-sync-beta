import { User } from "types";

export interface Session {
  currentUser: User;
  isLoggedIn: boolean;
}
