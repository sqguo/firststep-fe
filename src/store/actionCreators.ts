import { AnyAction } from "@reduxjs/toolkit";
import * as actionTypes from "./actionTypes";
import * as Enums from "../enums"


export function getGlobalMatchingStatusStartAction(): AnyAction {
  return {
    type: actionTypes.GET_GLOBAL_MATCHING_STATUS_START,
  };
}

export function getGlobalMatchingStatusSuccessAction(matchRounds: MatchRound[]): AnyAction {
  return {
    type: actionTypes.GET_GLOBAL_MATCHING_STATUS_SUCCESS,
    matchRounds
  };
}

export function getGlobalMatchingStatusFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.GET_GLOBAL_MATCHING_STATUS_FAILURE,
    status,
    error
  };
}

export function getAllSillsetsStartAction(): AnyAction {
  return {
    type: actionTypes.GET_ALL_SKILLSETS_START,
  };
}

export function getAllSillsetsSuccessAction(skillsets: Skillset[]): AnyAction {
  return {
    type: actionTypes.GET_ALL_SKILLSETS_SUCCESS,
    skillsets
  };
}

export function getAllSillsetsFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.GET_ALL_SKILLSETS_FAILURE,
    status,
    error
  };
}

export function getAllPreferencesStartAction(): AnyAction {
  return {
    type: actionTypes.GET_ALL_PREFERENCES_START,
  };
}

export function getAllPreferencesSuccessAction(preferences: Preference[]): AnyAction {
  return {
    type: actionTypes.GET_ALL_PREFERENCES_SUCCESS,
    preferences
  };
}

export function getAllPreferencesFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.GET_ALL_PREFERENCES_FAILURE,
    status,
    error
  };
}

export function getAllProgramsStartAction(): AnyAction {
  return {
    type: actionTypes.GET_ALL_PROGRAMS_START,
  };
}

export function getAllProgramsSuccessAction(programs: Program[]): AnyAction {
  return {
    type: actionTypes.GET_ALL_PROGRAMS_SUCCESS,
    programs
  };
}

export function getAllProgramsFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.GET_ALL_PROGRAMS_FAILURE,
    status,
    error
  };
}

export function getCheckNewEmailStartAction(email: string): AnyAction {
  return {
    type: actionTypes.SIGNUP_CHECK_NEW_EMAIL_START,
    email
  };
}

export function getCheckNewEmailSuccessAction(resp: EmailValidationResponse): AnyAction {
  return {
    type: actionTypes.SIGNUP_CHECK_NEW_EMAIL_SUCCESS,
    resp
  };
}

export function getCheckNewEmailFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.SIGNUP_CHECK_NEW_EMAIL_FAILURE,
    status,
    error
  };
}

export function getUpdateUserProfileStartAction(userId: number, newProfile: UserProfile): AnyAction {
  return {
    type: actionTypes.UPDATE_USER_PROFILE_START,
    payload: {
      userId,
      newProfile
    } 
  };
}

export function getUpdateUserProfileSuccessAction(resp: UpdateUserProfileResponse): AnyAction {
  return {
    type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
    userId: resp.userId,
    updatedProfile: resp.updatedProfile,
  };
}

export function getUpdateUserProfileFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.UPDATE_USER_PROFILE_FAILURE,
    status,
    error
  };
}

export function getOrCreateUserStartAction(email: string, firstName: string, lastName: string, autoRedirect?: boolean, redirectURL?: string): AnyAction {
  return {
    type: actionTypes.GET_OR_CREATE_USER_START,
    payload: {
      email,
      firstName,
      lastName,
    },
    autoRedirect,
    redirectURL
  };
}

export function getLogoutStartAction(autoRedirect?: boolean, redirectURL?: string): AnyAction {
  return {
    type: actionTypes.LOGOUT_USER_START,
    autoRedirect,
    redirectURL
  };
}

export function getLogoutSuccessAction(): AnyAction {
  return {
    type: actionTypes.LOGOUT_USER_SUCCESS,
  };
}

export function getCurrentUserStartAction(email: string, autoRedirect?: boolean, redirectURL?: string): AnyAction {
  return {
    type: actionTypes.GET_CURRENT_USER_START,
    email,
    autoRedirect,
    redirectURL
  };
}

export function getCurrentUserSuccessAction(resp: GetCurrentUserResponse): AnyAction {
  return {
    type: actionTypes.GET_CURRENT_USER_SUCCESS,
    userId: resp.userId,
    data: resp
  };
}

export function getCurrentUserFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.GET_CURRENT_USER_FAILURE,
    status,
    error
  };
}

export function getCurrentUserSkillsetsStartAction(userId: number): AnyAction {
  return {
    type: actionTypes.GET_CURRENT_USER_SKILLSETS_START,
    userId
  };
}

export function getCurrentUserSkillsetsSuccessAction(resp: GetCurrentUserSkillsetsResponse): AnyAction {
  return {
    type: actionTypes.GET_CURRENT_USER_SKILLSETS_SUCCESS,
    userId: resp.userId,
    skillsets: resp.skillsets
  };
}

export function getCurrentUserSkillsetsFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.GET_CURRENT_USER_SKILLSETS_FAILURE,
    status,
    error
  };
}

export function getCurrentUserPerferencesStartAction(userId: number): AnyAction {
  return {
    type: actionTypes.GET_CURRENT_USER_PREFERENCES_START,
    userId
  };
}

export function getCurrentUserPerferencesSuccessAction(resp: GetCurrentUserPreferencesResponse): AnyAction {
  return {
    type: actionTypes.GET_CURRENT_USER_PREFERENCES_SUCCESS,
    userId: resp.userId,
    preferences: resp.preferences
  };
}

export function getCurrentUserPerferencesFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.GET_CURRENT_USER_PREFERENCES_FAILURE,
    status,
    error
  };
}

export function getUpdateUserSkillsetsStartAction(userId: number, newSkillsets: UserSkillset[]): AnyAction {
  return {
    type: actionTypes.UPDATE_CURRENT_USER_SKILLSETS_START,
    payload: {
      userId,
      newSkillsets
    }
  };
}

export function getUpdateUserSkillsetsSuccessAction(resp: UpdateUserSkillsetsResponse): AnyAction {
  return {
    type: actionTypes.UPDATE_CURRENT_USER_SKILLSETS_SUCCESS,
    userId: resp.userId,
    updatedSkillsets: resp.updatedSkillsets
  };
}

export function getUpdateUserSkillsetsFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.UPDATE_CURRENT_USER_SKILLSETS_FAILURE,
    status,
    error
  };
}

export function getUpdateUserPreferencesStartAction(userId: number, newPreferences: UserPreference[]): AnyAction {
  return {
    type: actionTypes.UPDATE_CURRENT_USER_PREFERENCES_START,
    payload: {
      userId,
      newPreferences
    }
  };
}

export function getUpdateUserPreferencesSuccessAction(resp: UpdateUserPreferencesResponse): AnyAction {
  return {
    type: actionTypes.UPDATE_CURRENT_USER_PREFERENCES_SUCCESS,
    userId: resp.userId,
    updatedPreferences: resp.updatedPreferences
  };
}

export function getUpdateUserPreferencesFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.UPDATE_CURRENT_USER_PREFERENCES_FAILURE,
    status,
    error
  };
}

export function getJoinMatchroundStartAction(userId: number, matchroundId: number): AnyAction {
  return {
    type: actionTypes.JOIN_MATCHROUND_START,
    payload: {
      userId,
      matchroundId
    }
  };
}

export function getJoinMatchroundSuccessAction(resp: JoinMatchRoundResponse): AnyAction {
  return {
    type: actionTypes.JOIN_MATCHROUND_SUCCESS,
    userId: resp.userId,
    matchroundId: resp.matchroundId,
    data: resp
  };
}

export function getJoinMatchroundFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.JOIN_MATCHROUND_FAILURE,
    status,
    error
  };
}

export function getLeaveMatchroundStartAction(userId: number, matchroundId: number): AnyAction {
  return {
    type: actionTypes.LEAVE_MATCHROUND_START,
    payload: {
      userId,
      matchroundId
    }
  };
}

export function getLeaveMatchroundSuccessAction(resp: LeaveMatchRoundReponse): AnyAction {
  return {
    type: actionTypes.LEAVE_MATCHROUND_SUCCESS,
    userId: resp.userId,
    matchroundId: resp.matchroundId,
    data: resp
  };
}

export function getLeaveMatchroundFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.LEAVE_MATCHROUND_FAILURE,
    status,
    error
  };
}

export function getGroupProfileStartAction(userId: number): AnyAction {
  return {
    type: actionTypes.GET_GROUP_PROFILE_START,
    userId
  };
}

export function getGroupProfileSuccessAction(resp: GetGroupProfileResponse): AnyAction {
  return {
    type: actionTypes.GET_GROUP_PROFILE_SUCCESS,
    userId: resp.userId,
    group: resp.group
  };
}

export function getGroupProfileFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.GET_GROUP_PROFILE_FAILURE,
    status,
    error
  };
}

export function getUpdateGroupCommitmentStartAction(userId: number, groupId: number, action: Enums.GroupCommitmentOptions, reason: string | null): AnyAction {
  return {
    type: actionTypes.UPDATE_GROUP_COMMITMENT_START,
    payload: {
      userId,
      groupId,
      action,
      reason
    }
  };
}

export function getUpdateGroupCommitmentSuccessAction(resp: groupCommitmentOptionResponse): AnyAction {
  return {
    type: actionTypes.UPDATE_GROUP_COMMITMENT_SUCCESS,
    userId: resp.userId,
    hasGroup: resp.hasGroup,
    group: resp.group
  };
}

export function getUpdateGroupCommitmentFailureAction(status: number, error: any): AnyAction {
  return {
    type: actionTypes.UPDATE_GROUP_COMMITMENT_FAILURE,
    status,
    error
  };
}

export function getOpenLoginModalAction(): AnyAction {
  return {
    type: actionTypes.OPEN_LOGIN_MODAL,
  }
}

export function getCloseLoginModalAction(): AnyAction {
  return {
    type: actionTypes.CLOSE_LOGIN_MODAL,
  }
}

export function getShowHomepageWalkthroughAction(flag: boolean): AnyAction {
  return {
    type: actionTypes.SHOW_HOMEPAGE_WALKTHROUGH,
    flag,
  }
}
