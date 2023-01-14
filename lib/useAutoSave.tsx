import * as React from "react";
import { useRecoilState } from "recoil";
import { api } from "../utils/api";
import { userProfile } from "../state/state";
import { User } from "../data/model/UserInfo";

export interface FirebaseState {
  handleAutoSave: () => void;
}

export function useAutoSave(): FirebaseState {
  const [userInfo, setUserInfo] = React.useState<User>();
  const updateProfile = api.user.updateUser.useMutation();
  const [currentUser] = useRecoilState(userProfile);

  const handleAutoSave = () => {
    setUserInfo(currentUser);
  };

  React.useEffect(() => {
    if (userInfo) {
      updateProfile.mutate(currentUser);
    }
  }, [userInfo]);

  return {
    handleAutoSave,
  };
}
