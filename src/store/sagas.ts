import axios, { AxiosError } from 'axios';
import { AnyAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import * as actionCreators from "./actionCreators";
import * as actionTypes from "./actionTypes";
import * as apiService from "../api/services";

function parseErrorCode(err: Error | AxiosError) {
  if(!axios.isAxiosError(err)){
    return -1
  } else {
    const error = err as AxiosError
    return error?.response?.status || -2
  }
}

function* getGlobalMatchingStatus() {
  try {
    const { data } = yield call(apiService.fetchGlobalMatchingStatus);
    yield put(actionCreators.getGlobalMatchingStatusSuccessAction(data.matchRounds));
  } catch (err: any) {
    yield put(actionCreators.getGlobalMatchingStatusFailureAction(parseErrorCode(err), err));
  }
}

function* getAllSkillsets() {
  try {
    const { data } = yield call(apiService.fetchAllSkillsets);
    yield put(actionCreators.getAllSillsetsSuccessAction(data.skillsets));
  } catch (err: any) {
    yield put(actionCreators.getAllSillsetsFailureAction(parseErrorCode(err), err));
  }
}

function* getAllPreferences() {
  try {
    const { data } = yield call(apiService.fetchAllPreferences);
    yield put(actionCreators.getAllPreferencesSuccessAction(data.preferences));
  } catch (err: any) {
    yield put(actionCreators.getAllPreferencesFailureAction(parseErrorCode(err), err));
  }
}

function* getAllPrograms() {
  try {
    const { data } = yield call(apiService.fetchAllPrograms);
    yield put(actionCreators.getAllProgramsSuccessAction(data.programs));
  } catch (err: any) {
    yield put(actionCreators.getAllProgramsFailureAction(parseErrorCode(err), err));
  }
}

function* checkNewEmail({ email }: AnyAction) {
  try {
    const { data } = yield call(apiService.validateNewEmail, email);
    yield put(actionCreators.getCheckNewEmailSuccessAction(data));
  } catch (err: any) {
    yield put(actionCreators.getCheckNewEmailFailureAction(parseErrorCode(err), err));
  }
}

function* updateUserProfile({ payload }: AnyAction) {
  try {
    const { data } = yield call(apiService.updateUserProfile, payload);
    yield put(actionCreators.getUpdateUserProfileSuccessAction(data));
  } catch (err: any) {
    yield put(actionCreators.getUpdateUserProfileFailureAction(parseErrorCode(err), err));
  }
}

function* getCurrentUser({ email }: AnyAction) {
  try {
    const { data } = yield call(apiService.getUserProfile, email);
    yield put(actionCreators.getCurrentUserSuccessAction(data));
  } catch (err: any) {
    yield put(actionCreators.getCurrentUserFailureAction(parseErrorCode(err), err));
  }
}

function* getCurrentUserSkillsets({ userId }: AnyAction) {
  try {
    const { data } = yield call(apiService.getUserSkillsets, userId);
    yield put(actionCreators.getCurrentUserSkillsetsSuccessAction(data));
  } catch (err: any) {
    yield put(actionCreators.getCurrentUserSkillsetsFailureAction(parseErrorCode(err), err));
  }
}

function* getCurrentUserPreferences({ userId }: AnyAction) {
  try {
    const { data } = yield call(apiService.getUserPreferences, userId);
    yield put(actionCreators.getCurrentUserPerferencesSuccessAction(data));
  } catch (err: any) {
    yield put(actionCreators.getCurrentUserPerferencesFailureAction(parseErrorCode(err), err));
  }
}

function* updateUserSkillsets({ payload }: AnyAction) {
  try {
    const { data } = yield call(apiService.updateUserSkillsets, payload);
    yield put(actionCreators.getUpdateUserSkillsetsSuccessAction(data));
  } catch (err: any) {
    yield put(actionCreators.getUpdateUserSkillsetsFailureAction(parseErrorCode(err), err));
  }
}

function* updateUserPreferences({ payload }: AnyAction) {
  try {
    const { data } = yield call(apiService.updateUserPreferences, payload);
    yield put(actionCreators.getUpdateUserPreferencesSuccessAction(data));
  } catch (err: any) {
    yield put(actionCreators.getUpdateUserPreferencesFailureAction(parseErrorCode(err), err));
  }
}

function* joinMatchround({ payload }: AnyAction) {
  try {
    const { data } = yield call(apiService.joinMatchround, payload);
    yield put(actionCreators.getJoinMatchroundSuccessAction(data));
  } catch (err: any) {
    yield put(actionCreators.getJoinMatchroundFailureAction(parseErrorCode(err), err));
  }
}

function* leaveMatchround({ payload }: AnyAction) {
  try {
    const { data } = yield call(apiService.leaveMatchround, payload);
    yield put(actionCreators.getLeaveMatchroundSuccessAction(data));
  } catch (err: any) {
    yield put(actionCreators.getLeaveMatchroundFailureAction(parseErrorCode(err), err));
  }
}

function* getGroupProfile({ userId }: AnyAction) {
  try {
    const { data } = yield call(apiService.getGroupProfile, userId);
    yield put(actionCreators.getGroupProfileSuccessAction(data));
  } catch (err: any) {
    yield put(actionCreators.getGroupProfileFailureAction(parseErrorCode(err), err));
  }
}

function * rootSaga() {
  yield all([
    takeLatest(actionTypes.GET_GLOBAL_MATCHING_STATUS_START, getGlobalMatchingStatus),
    takeLatest(actionTypes.GET_ALL_SKILLSETS_START, getAllSkillsets),
    takeLatest(actionTypes.GET_ALL_PREFERENCES_START, getAllPreferences),
    takeLatest(actionTypes.GET_ALL_PROGRAMS_START, getAllPrograms),
    takeLatest(actionTypes.SIGNUP_CHECK_NEW_EMAIL_START, checkNewEmail),
    takeLeading(actionTypes.UPDATE_USER_PROFILE_START, updateUserProfile),
    takeLatest(actionTypes.GET_CURRENT_USER_START, getCurrentUser),
    takeLatest(actionTypes.GET_CURRENT_USER_SKILLSETS_START, getCurrentUserSkillsets),
    takeLatest(actionTypes.GET_CURRENT_USER_PREFERENCES_START, getCurrentUserPreferences),
    takeLeading(actionTypes.UPDATE_CURRENT_USER_SKILLSETS_START, updateUserSkillsets),
    takeLeading(actionTypes.UPDATE_CURRENT_USER_PREFERENCES_START, updateUserPreferences),
    takeLeading(actionTypes.JOIN_MATCHROUND_START, joinMatchround),
    takeLeading(actionTypes.LEAVE_MATCHROUND_START, leaveMatchround),
    takeLatest(actionTypes.GET_GROUP_PROFILE_START, getGroupProfile),
  ])
}

export default rootSaga
