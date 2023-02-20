import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { OnboardingStatus } from "../../enums";

const ZEROS = "000000000000";
const PLACEHOLDER_UUID = process.env.APP_UUID as string;

export const getUserIdForUUID = (uuid: string) => {
  return Number(uuid.slice(-ZEROS.length));
}

export const getUserUUIDForId = (id: number | null) => {
  return PLACEHOLDER_UUID.slice(0, 24) +
    (ZEROS + (id ?? "999999999999")).slice(-ZEROS.length);
}

function useUserProfile() {
  const userProfile: UserProfile | null = useSelector(
    (state: AppState) => state.currentUser?.profile ?? null
  );
  const userOnboardingStatus = useSelector(
    (state: AppState) => state.currentUser?.onboardingStatus ?? null
  );

  const userId = userProfile?.id ?? null;
  const userUUID = getUserUUIDForId(userId);

  const isLoggedIn = useSelector((state: AppState) => !!state.currentUser);

  const isOnboardingCompleted =
    userOnboardingStatus && userOnboardingStatus >= OnboardingStatus.Completed;

  return {
    userId,
    userUUID,
    userProfile,
    isLoggedIn,
    userOnboardingStatus,
    isOnboardingCompleted,
  };
}

export default useUserProfile;
