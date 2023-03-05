import React from "react";
import { Step, StepLabel, Stepper as MUIStepper } from "@mui/material";
import classNames from "classnames";
import * as enums from "../../enums";
import { relevantOnboardingSteps } from "./onboardingConfig";
import useUserProfile from "../../common/hooks/useUserProfile";
import history from "../../history";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RecommendIcon from '@mui/icons-material/Recommend';

import "./stepper.scss";

interface StepperProps {
  currentStep: enums.OnboardingStatus;
}

const Stepper = (props: StepperProps) => {
  const { currentStep } = props;
  const { userOnboardingStatus } = useUserProfile();
  const { user } = useAuth0();
  const isUserVerified = !!user?.email_verified;

  return (
    <div className="onboarding__steps-container">
      <MUIStepper
        activeStep={userOnboardingStatus ?? currentStep}
        alternativeLabel
      >
        {relevantOnboardingSteps.map((step) => {
          const enableInteract =
            userOnboardingStatus &&
            step.id <= userOnboardingStatus + 1 &&
            step.id !== enums.OnboardingStatus.Step0;
          const specialProps =
            step.id === enums.OnboardingStatus.Step0
              ? { completed: isUserVerified }
              : {};
          const specialLabelProps = step.id === enums.OnboardingStatus.Step0
          ? { StepIconComponent: isUserVerified ? RecommendIcon : ErrorOutlineIcon }
          : {};
          return (
            <Step
              className={classNames({
                interactive: enableInteract,
              })}
              key={step.id}
              onClick={() => {
                if (enableInteract) {
                  history.push(step.currentUrl);
                }
              }}
              {...specialProps}
            >
              <StepLabel {...specialLabelProps}>{step.brief}</StepLabel>
            </Step>
          );
        })}
      </MUIStepper>
    </div>
  );
};

export default Stepper;
