import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import useUserProfile from "./common/hooks/useUserProfile";
import { OnboardingStatus } from "./enums";

const AutoRedirectRoute = (props: any) => {
  const { isLoggedIn, userOnboardingStatus } = useUserProfile();
  const { children, ...rest } = props;
  return (
    <Route {...rest}>
      {(!isLoggedIn || !userOnboardingStatus) && (
        <Redirect to={{ pathname: "/" }} />
      )}
      {userOnboardingStatus === OnboardingStatus.NotStarted && (
        <Redirect to={{ pathname: "/onboarding/profile" }} />
      )}
      {userOnboardingStatus === OnboardingStatus.Step0 && (
        <Redirect to={{ pathname: "/onboarding/profile" }} />
      )}
      {userOnboardingStatus === OnboardingStatus.Step1 && (
        <Redirect to={{ pathname: "/onboarding/skillsets" }} />
      )}
      {userOnboardingStatus === OnboardingStatus.Step2 && (
        <Redirect to={{ pathname: "/onboarding/preferences" }} />
      )}
      {userOnboardingStatus &&
        userOnboardingStatus >= OnboardingStatus.Step2 && (
          <Redirect to={{ pathname: "/dashboard" }} />
        )}
    </Route>
  );
};

export default AutoRedirectRoute;
