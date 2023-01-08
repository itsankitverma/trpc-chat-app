import { atom } from "recoil";
import { User } from "../data/model/UserInfo";
import { v1 } from "uuid";

export const DEFAULT_USER_STATE: User = {
  handle: "",
  email: "",
  name: "",
};

const userState = atom<boolean>({
  key: `userState/${v1()}`,
  default: false,
});

export { userState };
