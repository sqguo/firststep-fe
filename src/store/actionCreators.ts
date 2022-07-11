import { AnyAction } from "@reduxjs/toolkit";
import * as actionTypes from "./actionTypes";

export function getUserAction(id: number): AnyAction {
  return {
    type: actionTypes.GET_USER_PROFILE,
    id,
  };
}

export function getUserSuccessAction(user: User): AnyAction {
  return {
    type: actionTypes.GET_USER_PROFILE_SUCCESS,
    user,
  };
}

export function getUserFailureAction(error: string): AnyAction {
  return {
    type: actionTypes.GET_USER_PROFILE_FAILURE,
    error,
  };
}
