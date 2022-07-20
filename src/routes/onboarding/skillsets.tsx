import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import * as actions from "../../store/actionCreators";
import history from "../../history";
import * as enums from "../../enums";
import {
  Step,
  StepLabel,
  Stepper,
  Slider,
  Fab,
  CircularProgress,
} from "@mui/material";
import {
  KeyboardArrowUp as UpIcon,
  Navigation as NavigationIcon,
} from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";

import { LoadingScreen } from "../../common/components";
import { onBoardingSteps, onBoardingStepsMap } from "./onboardingConfig";
import theme from "../../common/styles/theme";
import "./skillsets.scss";

interface Props {}
const currentStep = enums.OnboardingStatus.Step1;
const marks = [
  {
    value: 1.2,
    label: "Unfamiliar With",
  },
  {
    value: 8.8,
    label: "Very Skilled At",
  },
];

const skillsets: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const isUpdating = useSelector(
    (state: AppState) => state.isUpdatingUserSettings
  );
  const isLoadingConfig = useSelector(
    (state: AppState) => state.isLoadingOnboardingConfigration
  );
  const prevSkillsets = useSelector(
    (state: AppState) => state.currentUser?.skillsets as UserSkillset[]
  );
  const onboardingStatus = useSelector(
    (state: AppState) => state.currentUser?.onboardingStatus as number
  );
  const userId = useSelector(
    (state: AppState) => state.currentUser?.profile?.id as number
  );
  const allSkillsets = useSelector(
    (state: AppState) => state.onboardingConfiguration.skillsets
  );

  const relevantOnboardingSteps = onBoardingSteps.filter(
    (step) =>
      step.id > enums.OnboardingStatus.NotStarted &&
      step.id <= enums.OnboardingStatus.Completed
  );
  const [newSkillsets, setNewSkillsets] = useState(
    {} as Record<number, UserSkillset>
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (Object.entries(allSkillsets).length == 0 || !allSkillsets) {
      dispatch(actions.getAllSillsetsStartAction());
    }
    return function cleanup() {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    if (!isLoadingConfig && Object.entries(allSkillsets).length > 0) {
      document.body.style.overflow = "unset";
      const initSkillsets: Record<number, UserSkillset> = {};
      Object.entries(allSkillsets).forEach((e) => {
        initSkillsets[e[1].id] = {
          attributeId: e[1].id,
          data: 5,
        };
      });
      setNewSkillsets(initSkillsets);
    }
  }, [isLoadingConfig]);

  useEffect(() => {
    if (!isUpdating && onboardingStatus > currentStep) {
      history.push(onBoardingStepsMap[onboardingStatus].nextUrl);
    }
  }, [isUpdating]);

  const onSubmit = () => {
    const newSkillsetsArr = Object.entries(newSkillsets).map((e) => e[1]);
    dispatch(
      actions.getUpdateUserSkillsetsStartAction(userId, newSkillsetsArr)
    );
  };

  const debouncedSliderUpdate = useCallback(
    _.debounce((id, value, curSkillsets) => {
      const newSkillsetsCopy = _.clone(curSkillsets);
      newSkillsetsCopy[id].data = Number(value);
      setNewSkillsets(newSkillsetsCopy);
    }, 100),
    []
  );
  const renderSkillSlider = (skill: Skillset) => {
    return (
      <div
        className="onboarding__skillsets__skill-slider-container"
        key={skill.id}
      >
        <div className="onboarding__skillsets__skill-slider-header">
          {skill.name}
        </div>
        <div className="onboarding__skillsets__skill-slider-description">
          {skill.description}
        </div>
        <Slider
          defaultValue={5}
          aria-label="Default"
          valueLabelDisplay="auto"
          step={0.1}
          min={0}
          max={10}
          marks={marks}
          onChange={(event: Event, newValue: number | number[]) => {
            debouncedSliderUpdate(skill.id, newValue as number, newSkillsets);
          }}
        />
      </div>
    );
  };

  const renderSkillsetForm = () => {
    return (
      <div className="onboarding__skillsets__qna-container">
        <ThemeProvider theme={theme}>
          {Object.keys(newSkillsets).length > 0 &&
            Object.entries(allSkillsets).map((e) => renderSkillSlider(e[1]))}
        </ThemeProvider>
        <div className="onboarding__floating-button__container">
          <div className="onboarding__floating-button__submission">
            <Fab variant="extended" onClick={onSubmit} disabled={isUpdating}>
              {isUpdating ? <CircularProgress size={25} /> : <NavigationIcon />}
              <span className="floating-button-text">Submit</span>
            </Fab>
          </div>
          <div className="onboarding__floating-button__scroll-to-top">
            <Fab
              color="secondary"
              size="medium"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <UpIcon />
            </Fab>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="onboarding__skillsets">
      <LoadingScreen isLoading={isLoadingConfig} />
      <div className="onboarding__skillsets-container">
        <div className="onboarding__steps-container">
          <Stepper activeStep={currentStep} alternativeLabel>
            {relevantOnboardingSteps.map((step) => (
              <Step key={step.id}>
                <StepLabel>{step.brief}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        {renderSkillsetForm()}
      </div>
    </div>
  );
};

export default skillsets;
