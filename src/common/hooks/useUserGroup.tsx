import React from "react";
import { useSelector } from "react-redux";
import { getUserUUIDForId } from "./useUserProfile";

const TestUsers = [
  {
    id: "50926704-8718-5159-bd71-c67db52c5a4e",
    name: "Tester",
    email: "tester@uwaterloo.ca",
    profileUrl: null,
    eTag: "",
    created: "",
    updated: "",
  },
];

function useUserGroup() {
  const userGroup: Group | null = useSelector(
    (state: AppState) => state.currentUser?.group as Group | null
  );

  const allMembers =
    userGroup?.members.map((m) => ({
      id: getUserUUIDForId(m.id),
      name: m.displayName,
      email: m.email,
      profileUrl: m.avatarURL,
      eTag: "",
      created: "",
      updated: "",
    })) ?? [];

  const groupChannelName = 'group-'+String(userGroup?.id ?? -1);

  return {
    userGroup,
    allMembers: [...TestUsers, ...allMembers],
    groupChannelName,
  };
}

export default useUserGroup;
