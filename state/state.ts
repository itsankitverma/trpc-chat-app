import { atom } from "recoil";
import type { User, UserList } from "../data/model/UserInfo";
import { v1 } from "uuid";

export const DEFAULT_USER_STATE: User = {
  name: "",
  email: "",
  id: "",
  handle: "",
  image: "",
};

// getCurrentUser
const userProfile = atom<User>({
  key: `userProfile/${v1()}`,
  default: DEFAULT_USER_STATE,
});

// getAllUser
const usersListState = atom<UserList[]>({
  key: `usersListState/${v1()}`,
  default: [],
});

//

export { userProfile, usersListState };
