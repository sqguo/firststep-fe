import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { OnboardingStatus } from "../../enums";

function useUserProfile() {
  const userProfile: UserProfile | null = useSelector(
    (state: AppState) => state.currentUser?.profile ?? null
  );
  const userOnboardingStatus = useSelector(
    (state: AppState) => state.currentUser?.onboardingStatus ?? null
  );

  const isLoggedIn = useSelector((state: AppState) => !!state.currentUser);

  const isOnboardingCompleted =
    userOnboardingStatus && userOnboardingStatus >= OnboardingStatus.Completed;

  return {
    userProfile,
    isLoggedIn,
    userOnboardingStatus,
    isOnboardingCompleted,
  };
}

export default useUserProfile;
