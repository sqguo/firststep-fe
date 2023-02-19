import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import * as actions from "../../store/actionCreators";
import history from "../../history";
import * as enums from "../../enums";
import { Slider, Fab, CircularProgress } from "@mui/material";
import {
  KeyboardArrowUp as UpIcon,
  Navigation as NavigationIcon,
} from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";

import { LoadingScreen } from "../../common/components";
import {
  onBoardingStepsMap,
} from "./onboardingConfig";
import theme from "../../common/styles/theme";
import "./skillsets.scss";
import Stepper from "./stepper";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const isUpdating = useSelector(
    (state: AppState) => state.isUpdatingUserSettings
  );
  const isLoadingConfig = useSelector(
    (state: AppState) =>
      state.isLoadingOnboardingConfigration || state.isLoadingUserSettings
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

  const [newSkillsets, setNewSkillsets] = useState(
    {} as Record<number, UserSkillset>
  );
  const [cachedDefaultSkillsets, setCachedDefaultSkillsets] = useState(
    {} as Record<number, UserSkillset>
  );

  const [hasSubmission, setHasSubmission] = useState(false);

  useEffect(() => {
    if (Object.entries(allSkillsets).length == 0 || !allSkillsets) {
      dispatch(actions.getAllSillsetsStartAction());
    }
    if (Object.entries(prevSkillsets).length == 0) {
      dispatch(actions.getCurrentUserSkillsetsStartAction(userId));
    }
  }, []);

  useEffect(() => {
    if (!isLoadingConfig && Object.entries(allSkillsets).length > 0) {
      const prevSkillMap: Record<number, UserSkillset> = {};
      Object.entries(prevSkillsets).forEach((e) => {
        prevSkillMap[e[1].attributeId] = e[1];
      });
      const initSkillsets: Record<number, UserSkillset> = {};
      Object.entries(allSkillsets).forEach((e) => {
        const curSkill: UserSkillset | null = prevSkillMap[e[1].id];
        initSkillsets[e[1].id] = {
          attributeId: e[1].id,
          data: curSkill ? Number(curSkill.data) : 5,
        };
      });
      setNewSkillsets(initSkillsets);
      setCachedDefaultSkillsets(_.cloneDeep(initSkillsets));
    }
  }, [isLoadingConfig]);

  useEffect(() => {
    if (!isUpdating && hasSubmission && onboardingStatus > currentStep) {
      history.push(onBoardingStepsMap[onboardingStatus].nextUrl);
    }
  }, [isUpdating, hasSubmission]);

  const onSubmit = () => {
    const newSkillsetsArr = Object.entries(newSkillsets).map((e) => e[1]);
    dispatch(
      actions.getUpdateUserSkillsetsStartAction(userId, newSkillsetsArr)
    );
    setHasSubmission(true);
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
          defaultValue={Number(cachedDefaultSkillsets[skill.id].data)}
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
                containerRef.current && containerRef.current.scrollTo(0, 0);
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
    <div className="onboarding__skillsets" ref={containerRef}>
      <LoadingScreen isLoading={isLoadingConfig} />
      <div className="onboarding__skillsets-container">
        <Stepper currentStep={currentStep} />
        {renderSkillsetForm()}
      </div>
    </div>
  );
};

export default skillsets;
