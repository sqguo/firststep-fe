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
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Fab,
  CircularProgress,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  KeyboardArrowUp as UpIcon,
  Navigation as NavigationIcon,
} from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";

import { LoadingScreen } from "../../common/components";
import { onBoardingStepsMap, relevantOnboardingSteps } from "./onboardingConfig";
import theme from "../../common/styles/theme";
import "./basicProfile.scss";

interface Props {}
const currentStep = enums.OnboardingStatus.Step0;

const BasicProfile: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const isUpdating = useSelector(
    (state: AppState) => state.isUpdatingUserSettings
  );
  const isLoadingConfig = useSelector(
    (state: AppState) => state.isLoadingOnboardingConfigration
  );
  const prevProfile = useSelector(
    (state: AppState) => state.currentUser?.profile as UserProfile
  );
  const onboardingStatus = useSelector(
    (state: AppState) => state.currentUser?.onboardingStatus as number
  );
  const allPrograms = useSelector(
    (state: AppState) => state.onboardingConfiguration.programs
  );

  useEffect(() => {
    if (Object.entries(allPrograms).length == 0 || !allPrograms) {
      dispatch(actions.getAllProgramsStartAction());
    }
  }, []);

  useEffect(() => {
    if (!isUpdating && onboardingStatus > currentStep) {
      history.push(onBoardingStepsMap[onboardingStatus].nextUrl);
    }
  }, [isUpdating]);

  const yearNow = new Date().getFullYear();
  const validateYear = (year: number) => {
    return Math.abs(year - yearNow) < 10;
  };
  const [newProfile, setNewProfile] = useState(prevProfile);
  const [yearInputValid, setYearInputValid] = useState(
    validateYear(newProfile.classYear || 0)
  );
  const isSubmittable: boolean =
    newProfile.classYear &&
    yearInputValid &&
    newProfile.firstName &&
    newProfile.lastName &&
    newProfile.displayName &&
    newProfile.program;

  const onSubmit = () => {
    dispatch(
      actions.getUpdateUserProfileStartAction(newProfile.id, newProfile)
    );
  };

  const renderGenericTextForm = (
    label: string,
    placeholder: string,
    prevValue: string | null,
    onUpdate: Function
  ) => {
    return (
      <div className="form-input-wrapper">
        <TextField
          required
          id="filled-required"
          label={label}
          defaultValue={prevValue || ""}
          placeholder={placeholder}
          onChange={(event) => {
            onUpdate(event.target.value);
          }}
          variant="filled"
          fullWidth
        />
      </div>
    );
  };

  const renderOtherTextForm = (
    label: string,
    placeholder: string,
    prevValue: string | null,
    onUpdate: Function
  ) => {
    return (
      <div className="form-input-wrapper">
        <TextField
          fullWidth
          id="filled-multiline-static"
          label={label}
          multiline
          rows={4}
          defaultValue={prevValue || ""}
          placeholder={placeholder}
          variant="filled"
          onChange={(event) => {
            onUpdate(event.target.value);
          }}
        />
      </div>
    );
  };

  const [showYearInputError, setShowYearInputError] = useState(false);
  const debouncedYearErrorUpdater = useCallback(
    _.debounce((isValid: boolean) => setShowYearInputError(!isValid), 1000),
    []
  );
  const renderYearForm = () => {
    return (
      <div className="form-input-wrapper">
        <TextField
          id="filled-number"
          label="Class Year"
          type="number"
          error={showYearInputError}
          defaultValue={prevProfile.classYear || ""}
          helperText={showYearInputError ? "Invalid Year" : ""}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          fullWidth
          onChange={(event) => {
            const year: number = Number(event.target.value);
            const isValid = validateYear(year);
            setYearInputValid(isValid);
            setNewProfile({ ...newProfile, classYear: year });
            debouncedYearErrorUpdater(isValid);
          }}
        />
      </div>
    );
  };

  const renderEmailDisplayOnly = () => {
    return (
      <div className="form-input-wrapper">
        <TextField
          fullWidth
          id="filled-read-only-input"
          label="Email"
          defaultValue={prevProfile.email}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
      </div>
    );
  };

  const renderProgramSelector = () => {
    const programId = newProfile.program?.id;
    return (
      <div className="form-input-wrapper">
        <FormControl fullWidth>
          <InputLabel id="program-selector-label">Program</InputLabel>
          <Select
            labelId="program-selector-label"
            id="program-selector"
            value={_.isNumber(programId) ? String(programId) : ""}
            label="Program"
            onChange={(event: SelectChangeEvent) => {
              setNewProfile({
                ...newProfile,
                program: allPrograms[Number(event.target.value)],
              });
            }}
          >
            {Object.entries(allPrograms).map((p) => {
              const program: Program = p[1];
              return (
                <MenuItem key={program.id} value={program.id}>
                  {program.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    );
  };

  const renderProfileForm = () => {
    return (
      <div className="onboarding__basic-profile__qna-container">
        <ThemeProvider theme={theme}>
          {renderEmailDisplayOnly()}
          {renderGenericTextForm(
            "First Name",
            "",
            prevProfile.firstName,
            (v: string) => {
              setNewProfile({ ...newProfile, firstName: v });
            }
          )}
          {renderGenericTextForm(
            "Last Name",
            "",
            prevProfile.lastName,
            (v: string) => {
              setNewProfile({ ...newProfile, lastName: v });
            }
          )}
          {renderGenericTextForm(
            "Preferred Name",
            "mr.goose jr.",
            prevProfile.displayName,
            (v: string) => {
              setNewProfile({ ...newProfile, displayName: v });
            }
          )}
          {renderYearForm()}
          {renderProgramSelector()}
          {renderOtherTextForm(
            "Tell us about yourself",
            "ex. I am freeloader and I love teamwork",
            prevProfile.bio,
            (v: string) => {
              setNewProfile({ ...newProfile, bio: v });
            }
          )}
          {renderOtherTextForm(
            "Avatar URL",
            "http://images.com/myavatar.jpg",
            prevProfile.avatarURL,
            (v: string) => {
              setNewProfile({ ...newProfile, avatarURL: v });
            }
          )}
        </ThemeProvider>

        <div className="onboarding__floating-button__container">
          <div className="onboarding__floating-button__submission">
            <Fab variant="extended" onClick={onSubmit} disabled={false && !isSubmittable || isUpdating}>
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
    <div className="onboarding__basic-profile">
      <LoadingScreen isLoading={isLoadingConfig} />
      <div className="onboarding__basic-profile-container">
        <div className="onboarding__steps-container">
          <Stepper activeStep={currentStep} alternativeLabel>
            {relevantOnboardingSteps.map((step) => (
              <Step key={step.id}>
                <StepLabel>{step.brief}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        {renderProfileForm()}
      </div>
    </div>
  );
};

export default BasicProfile;
