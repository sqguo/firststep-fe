import _ from "lodash";
import { AnyAction } from "@reduxjs/toolkit";
import * as actionTypes from "./actionTypes";
import * as Enums from "../enums";

const initialState: AppState = {
  currentUser: null,
  currentMatchrounds: [],
  onboardingConfiguration: {
    skillsets: {},
    preferences: {},
    programs: {},
  },
  isLoadingCurrentUser: false,
  isLoadingMatchrounds: false,
  isLoadingUserGroup: false,
  isLoadingGroupMemberProfile: false,
  isLoadingOnboardingConfigration: false,
  isVerifyingNewEmail: false,
  isLoadingUserSettings: false,
  isUpdatingUserSettings: false,
  isJoiningMatchRound: false,
  isLeavingMatchRound: false,
  isUpdatingGroupCommitment: false,
  hasError: false,
  errorCode: null,
  errorMessage: null,
  isNewEmailValid: false,
  newEmailRejectionReason: null,
  isLoginModalOpen: false,
  showHomepageWalkthrough: false,
  reducedFootprint: 0,
  isFetchingOtherUser: false,
  otherUserSkillsets: {},
};

const initialSignedInUserState: User = {
  profile: null,
  onboardingStatus: Enums.OnboardingStatus.NotStarted,
  isVerified: false,
  isEligible: false,
  hasGroup: false,
  group: null,
  currentMatchround: null,
  matchingHistory: [],
  skillsets: [],
  preferences: [],
};

const reducer = (
  state: AppState = initialState,
  action: AnyAction
): AppState => {
  switch (action.type) {
    case actionTypes.GET_GLOBAL_MATCHING_STATUS_START: {
      return {
        ...state,
        isLoadingMatchrounds: true,
      };
    }
    case actionTypes.GET_GLOBAL_MATCHING_STATUS_SUCCESS: {
      const userMatchround = state.currentUser?.currentMatchround;
      return {
        ...state,
        isLoadingMatchrounds: false,
        currentMatchrounds: action.matchRounds,
        currentUser: userMatchround
          ? {
              ...(state.currentUser as User),
              currentMatchround: _.find(action.matchRounds, {
                id: userMatchround.id,
              }),
            }
          : state.currentUser,
      };
    }
    case actionTypes.GET_GLOBAL_MATCHING_STATUS_FAILURE: {
      return {
        ...state,
        isLoadingMatchrounds: false,
        hasError: true,
      };
    }
    case actionTypes.GET_ALL_SKILLSETS_START: {
      return {
        ...state,
        isLoadingOnboardingConfigration: true,
      };
    }
    case actionTypes.GET_ALL_SKILLSETS_SUCCESS: {
      const skillsetRecords: Record<number, Skillset> = {};
      const skillsets = action.skillsets as Skillset[];
      skillsets.forEach((skill) => {
        skillsetRecords[skill.id] = skill;
      });
      return {
        ...state,
        isLoadingOnboardingConfigration: false,
        onboardingConfiguration: {
          ...state.onboardingConfiguration,
          skillsets: skillsetRecords,
        },
      };
    }
    case actionTypes.GET_ALL_SKILLSETS_FAILURE: {
      return {
        ...state,
        isLoadingOnboardingConfigration: false,
        hasError: true,
      };
    }
    case actionTypes.GET_ALL_PREFERENCES_START: {
      return {
        ...state,
        isLoadingOnboardingConfigration: true,
      };
    }
    case actionTypes.GET_ALL_PREFERENCES_SUCCESS: {
      const preferenceRecords: Record<number, Preference> = {};
      const preferences = action.preferences as Preference[];
      preferences.forEach((preference) => {
        preferenceRecords[preference.id] = preference;
      });
      return {
        ...state,
        isLoadingOnboardingConfigration: false,
        onboardingConfiguration: {
          ...state.onboardingConfiguration,
          preferences: preferenceRecords,
        },
      };
    }
    case actionTypes.GET_ALL_PREFERENCES_FAILURE: {
      return {
        ...state,
        isLoadingOnboardingConfigration: false,
        hasError: true,
      };
    }
    case actionTypes.GET_ALL_PROGRAMS_START: {
      return {
        ...state,
        isLoadingOnboardingConfigration: true,
      };
    }
    case actionTypes.GET_ALL_PROGRAMS_SUCCESS: {
      const programRecords: Record<number, Program> = {};
      const programs = action.programs as Program[];
      programs.forEach((program) => {
        programRecords[program.id] = program;
      });
      return {
        ...state,
        isLoadingOnboardingConfigration: false,
        onboardingConfiguration: {
          ...state.onboardingConfiguration,
          programs: programRecords,
        },
      };
    }
    case actionTypes.GET_ALL_PROGRAMS_FAILURE: {
      return {
        ...state,
        isLoadingOnboardingConfigration: false,
        hasError: true,
      };
    }
    case actionTypes.SIGNUP_CHECK_NEW_EMAIL_START: {
      return {
        ...state,
        isVerifyingNewEmail: true,
      };
    }
    case actionTypes.SIGNUP_CHECK_NEW_EMAIL_SUCCESS: {
      return {
        ...state,
        isVerifyingNewEmail: false,
        isNewEmailValid: action.resp.isNewEmailValid,
        newEmailRejectionReason: action.resp.rejectionReason,
      };
    }
    case actionTypes.SIGNUP_CHECK_NEW_EMAIL_FAILURE: {
      return {
        ...state,
        isVerifyingNewEmail: false,
      };
    }
    case actionTypes.UPDATE_USER_PROFILE_START: {
      return {
        ...state,
        isUpdatingUserSettings: true,
      };
    }
    case actionTypes.UPDATE_USER_PROFILE_SUCCESS: {
      const currentUser =
        state.currentUser === null
          ? initialSignedInUserState
          : state.currentUser;
      return {
        ...state,
        isUpdatingUserSettings: false,
        currentUser: {
          ...currentUser,
          profile: action.updatedProfile,
          onboardingStatus:
            currentUser.onboardingStatus <= Enums.OnboardingStatus.Step0
              ? Enums.OnboardingStatus.Step1
              : currentUser.onboardingStatus,
        },
      };
    }
    case actionTypes.UPDATE_USER_PROFILE_FAILURE: {
      return {
        ...state,
        isUpdatingUserSettings: false,
        hasError: true,
      };
    }
    case actionTypes.LOGOUT_USER_START:
      return {
        ...state,
        isLoadingCurrentUser: true,
      };
    case actionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isLoginModalOpen: false,
        currentUser: null,
        isLoadingCurrentUser: false,
      };
    case actionTypes.GET_OR_CREATE_USER_START:
    case actionTypes.GET_CURRENT_USER_START: {
      return {
        ...state,
        isLoadingCurrentUser: true,
      };
    }
    case actionTypes.GET_OR_CREATE_USER_SUCCESS:
    case actionTypes.GET_CURRENT_USER_SUCCESS: {
      const currentUser =
        state.currentUser === null
          ? initialSignedInUserState
          : state.currentUser;
      return {
        ...state,
        isLoadingCurrentUser: false,
        currentUser: {
          ...currentUser,
          ...action.data,
        },
        isLoginModalOpen: false,
      };
    }
    case actionTypes.GET_GROUP_PROFILE_FAILURE:
    case actionTypes.GET_CURRENT_USER_FAILURE: {
      return {
        ...state,
        isLoadingCurrentUser: false,
        hasError: true,
      };
    }
    case actionTypes.GET_CURRENT_USER_SKILLSETS_START: {
      return {
        ...state,
        isLoadingUserSettings: true,
      };
    }
    case actionTypes.GET_CURRENT_USER_SKILLSETS_SUCCESS: {
      const currentUser = state.currentUser as User;
      return {
        ...state,
        isLoadingUserSettings: false,
        currentUser: {
          ...currentUser,
          skillsets: action.skillsets,
        },
      };
    }
    case actionTypes.GET_CURRENT_USER_SKILLSETS_FAILURE: {
      return {
        ...state,
        isLoadingUserSettings: false,
        hasError: true,
      };
    }
    case actionTypes.GET_ANOTHER_USER_SKILLSETS_START: {
      return {
        ...state,
        isFetchingOtherUser: true,
      };
    }
    case actionTypes.GET_ANOTHER_USER_SKILLSETS_SUCCESS: {
      const allUsersSkills = {
        ...state.otherUserSkillsets,
        [action.userId]: action.skillsets,
      };
      return {
        ...state,
        otherUserSkillsets: allUsersSkills,
        isFetchingOtherUser: false,
      };
    }
    case actionTypes.GET_ANOTHER_USER_SKILLSETS_FAILURE: {
      return {
        ...state,
        isFetchingOtherUser: false,
        hasError: true,
      };
    }
    case actionTypes.GET_CURRENT_USER_PREFERENCES_START: {
      return {
        ...state,
        isLoadingUserSettings: true,
      };
    }
    case actionTypes.GET_CURRENT_USER_PREFERENCES_SUCCESS: {
      const currentUser = state.currentUser as User;
      return {
        ...state,
        isLoadingUserSettings: false,
        currentUser: {
          ...currentUser,
          preferences: action.preferences,
        },
      };
    }
    case actionTypes.GET_CURRENT_USER_PREFERENCES_FAILURE: {
      return {
        ...state,
        isLoadingUserSettings: false,
        hasError: true,
      };
    }
    case actionTypes.UPDATE_CURRENT_USER_SKILLSETS_START: {
      return {
        ...state,
        isUpdatingUserSettings: true,
      };
    }
    case actionTypes.UPDATE_CURRENT_USER_SKILLSETS_SUCCESS: {
      const currentUser = state.currentUser as User;
      return {
        ...state,
        isUpdatingUserSettings: false,
        currentUser: {
          ...currentUser,
          skillsets: action.updatedSkillsets,
          onboardingStatus:
            currentUser.onboardingStatus <= Enums.OnboardingStatus.Step1
              ? Enums.OnboardingStatus.Step2
              : currentUser.onboardingStatus,
        },
      };
    }
    case actionTypes.UPDATE_CURRENT_USER_SKILLSETS_FAILURE: {
      return {
        ...state,
        isUpdatingUserSettings: false,
        hasError: true,
      };
    }
    case actionTypes.UPDATE_CURRENT_USER_PREFERENCES_START: {
      return {
        ...state,
        isUpdatingUserSettings: true,
      };
    }
    case actionTypes.UPDATE_CURRENT_USER_PREFERENCES_SUCCESS: {
      const currentUser = state.currentUser as User;
      return {
        ...state,
        isUpdatingUserSettings: false,
        currentUser: {
          ...currentUser,
          preferences: action.updatedPreferences,
          onboardingStatus:
            currentUser.onboardingStatus <= Enums.OnboardingStatus.Step2
              ? Enums.OnboardingStatus.Completed
              : currentUser.onboardingStatus,
        },
      };
    }
    case actionTypes.UPDATE_CURRENT_USER_PREFERENCES_FAILURE: {
      return {
        ...state,
        isUpdatingUserSettings: false,
        hasError: true,
      };
    }
    case actionTypes.JOIN_MATCHROUND_START: {
      return {
        ...state,
        isJoiningMatchRound: true,
      };
    }
    case actionTypes.JOIN_MATCHROUND_SUCCESS: {
      const currentUser = state.currentUser as User;
      const currentMatchround = action.data.success
        ? action.data.currentMatchround
        : currentUser?.currentMatchround;
      return {
        ...state,
        isJoiningMatchRound: false,
        currentUser: {
          ...currentUser,
          currentMatchround,
        },
      };
    }
    case actionTypes.JOIN_MATCHROUND_FAILURE: {
      return {
        ...state,
        isJoiningMatchRound: false,
        hasError: true,
      };
    }
    case actionTypes.LEAVE_MATCHROUND_START: {
      return {
        ...state,
        isLeavingMatchRound: true,
      };
    }
    case actionTypes.LEAVE_MATCHROUND_SUCCESS: {
      const currentUser = state.currentUser as User;
      const currentMatchround = action.data.success
        ? null
        : currentUser?.currentMatchround;
      return {
        ...state,
        isLeavingMatchRound: false,
        currentUser: {
          ...currentUser,
          currentMatchround,
        },
      };
    }
    case actionTypes.LEAVE_MATCHROUND_FAILURE: {
      return {
        ...state,
        isLeavingMatchRound: false,
        hasError: true,
      };
    }
    case actionTypes.GET_GROUP_PROFILE_START: {
      return {
        ...state,
        isLoadingUserGroup: true,
      };
    }
    case actionTypes.GET_GROUP_PROFILE_SUCCESS: {
      const currentUser = state.currentUser as User;
      return {
        ...state,
        isLoadingUserGroup: false,
        currentUser: {
          ...currentUser,
          group: action.group,
        },
      };
    }
    case actionTypes.GET_GROUP_PROFILE_FAILURE: {
      return {
        ...state,
        isLoadingUserGroup: false,
        hasError: true,
      };
    }
    case actionTypes.UPDATE_GROUP_COMMITMENT_START: {
      return {
        ...state,
        isUpdatingGroupCommitment: true,
      };
    }
    case actionTypes.UPDATE_GROUP_COMMITMENT_SUCCESS: {
      const currentUser = state.currentUser as User;
      return {
        ...state,
        isUpdatingGroupCommitment: false,
        currentUser: {
          ...currentUser,
          hasGroup: action.hasGroup,
          group: action.group,
          currentMatchround: null,
        },
      };
    }
    case actionTypes.UPDATE_GROUP_COMMITMENT_FAILURE: {
      return {
        ...state,
        isUpdatingGroupCommitment: false,
        hasError: true,
      };
    }
    case actionTypes.OPEN_LOGIN_MODAL: {
      return {
        ...state,
        isLoginModalOpen: true,
      };
    }
    case actionTypes.CLOSE_LOGIN_MODAL: {
      return {
        ...state,
        isLoginModalOpen: false,
      };
    }
    case actionTypes.SHOW_HOMEPAGE_WALKTHROUGH: {
      return {
        ...state,
        showHomepageWalkthrough: action.flag,
      };
    }
    case actionTypes.SET_REDUCED_FOOTPRINT: {
      return {
        ...state,
        reducedFootprint: action.flag,
      };
    }
  }
  return state;
};

export default reducer;
