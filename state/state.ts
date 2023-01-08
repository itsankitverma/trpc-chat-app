import { atom, selector } from "recoil";
import { User } from "../data/model/UserInfo";
import { v1 } from "uuid";

export const DEFAULT_USER_STATE: User = {
  handle: "",
  email: "",
  name: "",
};

const userState = atom<User>({
  key: `userState/${v1()}`,
  default: DEFAULT_USER_STATE,
});

export { userState };
