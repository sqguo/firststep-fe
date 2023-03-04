import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import classnames from "classnames";
import * as actions from "../../store/actionCreators";
import history from "../../history";
import * as enums from "../../enums";
import {
  Fab,
  MobileStepper,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  KeyboardArrowLeft as LeftIcon,
  KeyboardArrowRight as RightIcon,
  Favorite as LikeIcon,
  Navigation as NavigationIcon,
} from "@mui/icons-material";
import PoopIcon from "../../assets/poop.svg";
import SwipeableViews from "react-swipeable-views";
import { LoadingScreen } from "../../common/components";
import { randomColorPicker } from "../../common/styles/theme";
import {
  onBoardingStepsMap,
  relevantOnboardingSteps,
} from "./onboardingConfig";

import "./preference.scss";
import Stepper from "./stepper";

interface Props {}
const currentStep = enums.OnboardingStatus.Step2;
const preference: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const isUpdating = useSelector(
    (state: AppState) => state.isUpdatingUserSettings
  );
  const isLoadingConfig = useSelector(
    (state: AppState) =>
      state.isLoadingOnboardingConfigration || state.isLoadingUserSettings
  );
  const prevPreferences = useSelector(
    (state: AppState) => state.currentUser?.preferences as UserPreference[]
  );
  const onboardingStatus = useSelector(
    (state: AppState) => state.currentUser?.onboardingStatus as number
  );
  const userId = useSelector(
    (state: AppState) => state.currentUser?.profile?.id as number
  );
  const allPreferences = useSelector(
    (state: AppState) => state.onboardingConfiguration.preferences
  );

  const allPreferencesArr: Preference[] = Object.entries(allPreferences).map(
    (e) => e[1]
  );
  const [hasSeenAll, setHasSeenAll] = useState(false);
  const [newPreferences, setNewPreferences] = useState(
    {} as Record<number, UserPreference>
  );
  const [focusedPrefIdx, setFocusedPrefIdx] = useState(0);
  const [hasSubmission, setHasSubmission] = useState(false);

  useEffect(() => {
    if (Object.entries(allPreferences).length == 0 || !allPreferences) {
      dispatch(actions.getAllPreferencesStartAction());
    }
    if (Object.entries(prevPreferences).length == 0) {
      dispatch(actions.getCurrentUserPerferencesStartAction(userId));
    }
  }, []);

  useEffect(() => {
    if (!isLoadingConfig && Object.entries(allPreferences).length > 0) {
      const prevPrefMap: Record<number, UserSkillset> = {};
      Object.entries(prevPreferences).forEach((e) => {
        prevPrefMap[e[1].attributeId] = e[1];
      });
      const initPreferences: Record<number, UserSkillset> = {};
      Object.entries(allPreferences).forEach((e) => {
        const curSkill: UserSkillset | null = prevPrefMap[e[1].id];
        initPreferences[e[1].id] = {
          attributeId: e[1].id,
          data: curSkill ? Boolean(curSkill.data) : null,
        };
      });
      setNewPreferences(initPreferences);
    }
  }, [isLoadingConfig]);

  useEffect(() => {
    if (!isUpdating && hasSubmission && onboardingStatus > currentStep) {
      history.push(onBoardingStepsMap[onboardingStatus].nextUrl);
    }
  }, [isUpdating, hasSubmission]);

  const onSubmit = (pref: Record<number, UserPreference>) => {
    const newPreferencessArr = Object.entries(pref).map((e) => e[1]);
    dispatch(
      actions.getUpdateUserPreferencesStartAction(userId, newPreferencessArr)
    );
    setHasSubmission(true)
  };

  const renderLikeButton = (prefidx: number) => {
    const prefId: number = allPreferencesArr[prefidx].id;
    const isSelected = newPreferences[prefId].data === true;
    return (
      <div
        className={classnames({
          "like-button": true,
          "choice-button-selected": isSelected,
        })}
      >
        <Tooltip title="like this" placement="top">
          <div>
            <Fab
              onClick={() => {
                const newPreferenceCopy: Record<number, UserPreference> =
                  _.clone(newPreferences);
                newPreferenceCopy[prefId].data = isSelected ? null : true;
                setNewPreferences(newPreferenceCopy);
                if (prefidx == allPreferencesArr.length - 1) {
                  onSubmit(newPreferenceCopy);
                } else if (!isSelected) {
                  setFocusedPrefIdx(prefidx + 1);
                }
              }}
            >
              <LikeIcon />
            </Fab>
          </div>
        </Tooltip>
      </div>
    );
  };

  const renderHateButton = (prefidx: number) => {
    const prefId: number = allPreferencesArr[prefidx].id;
    const isSelected = newPreferences[prefId].data === false;
    return (
      <div
        className={classnames({
          "hate-button": true,
          "choice-button-selected": isSelected,
        })}
      >
        <Tooltip title={"Urghhhh"} placement="top">
          <div>
            <Fab
              onClick={() => {
                const newPreferenceCopy: Record<number, UserPreference> =
                  _.clone(newPreferences);
                newPreferenceCopy[prefId].data = isSelected ? null : false;
                setNewPreferences(newPreferenceCopy);
                if (prefidx == allPreferencesArr.length - 1) {
                  onSubmit(newPreferenceCopy);
                } else if (!isSelected) {
                  setFocusedPrefIdx(prefidx + 1);
                }
              }}
            >
              <span className="hate-icon-wrapper">
                <PoopIcon />
              </span>
            </Fab>
          </div>
        </Tooltip>
      </div>
    );
  };

  const renderSingleSlide = (pref: Preference) => {
    const bgStyle = { backgroundColor: randomColorPicker(String(pref.id)) };
    const reformatDesc = (desc: string) => {
      if (desc.length <= 300) return desc;
      const extra = desc.substring(320);
      const nextSpace = extra.indexOf(" ");
      return desc.substring(0, 320 + nextSpace) + ".....";
    };
    return (
      <div className="onboarding__preference__slider-wrapper" key={pref.id}>
        <div className="onboarding__preference__slide" style={bgStyle}>
          <div className="onboarding__preference__slide__picture-wrapper">
            <img src={pref.imageUrl || ""}></img>
          </div>
          <div className="onboarding__preference__slide__content">
            <div className="onboarding__preference__slide__title">
              {pref.name}
            </div>
            <div className="onboarding__preference__slide__description">
              {reformatDesc(pref.description)}
            </div>
          </div>
          <div className="onboarding__preference__slide__control-container">
            {renderHateButton(focusedPrefIdx)}
            {renderLikeButton(focusedPrefIdx)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="onboarding__preference">
      <LoadingScreen isLoading={isLoadingConfig || isUpdating} />
      <Stepper currentStep={currentStep} />
      {Object.entries(newPreferences).length > 0 && (
        <React.Fragment>
          <div className="onboarding__preference__content-container">
            <SwipeableViews
              enableMouseEvents
              index={focusedPrefIdx}
              resistance
              onChangeIndex={(newIdx, oldIdx) => {
                setFocusedPrefIdx(newIdx);
              }}
            >
              {allPreferencesArr.map((e) => renderSingleSlide(e))}
            </SwipeableViews>
          </div>

          <div className="onboarding__preference__bottom-stepper-wrapper">
            <MobileStepper
              steps={allPreferencesArr.length}
              position="static"
              activeStep={focusedPrefIdx}
              nextButton={<span />}
              backButton={<span />}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default preference;
