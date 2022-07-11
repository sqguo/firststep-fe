import { AnyAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as actionCreators from "./actionCreators";
import * as actionTypes from "./actionTypes";
import { fetchUser } from "./services";

function* getUser({ id }: AnyAction) {
  try {
    const { data } = yield call(fetchUser, id);
    yield put(actionCreators.getUserSuccessAction(data));
  } catch (e) {
    yield put(actionCreators.getUserFailureAction(String(e)));
  }
}

function * rootSaga() {
  yield all([
    takeLatest(actionTypes.GET_USER_PROFILE, getUser),
  ])
}

export default rootSaga
