import * as enums from "../../enums";

export const onBoardingSteps: OnboardingStep[] = [
  {
    id: enums.OnboardingStatus.NotStarted,
    currentUrl: "/",
    nextUrl: "/",
    brief: "unverified",
  },
  {
    id: enums.OnboardingStatus.Step0,
    currentUrl: "/",
    nextUrl: "/onboarding/profile",
    brief: "Email verified",
  },
  {
    id: enums.OnboardingStatus.Step1,
    currentUrl: "/onboarding/profile",
    nextUrl: "/onboarding/skillsets",
    brief: "Profile Created",
  },
  {
    id: enums.OnboardingStatus.Step2,
    currentUrl: "/onboarding/skillsets",
    nextUrl: "/onboarding/preferences",
    brief: "Skillsets Identified",
  },
  {
    id: enums.OnboardingStatus.Completed,
    currentUrl: "/onboarding/preferences",
    nextUrl: "/dashboard",
    brief: "Preferences Updated",
  },
];

export const onBoardingStepsMap: Record<number, OnboardingStep> = {};
onBoardingSteps.forEach((step) => {
  onBoardingStepsMap[step.id] = step;
});
