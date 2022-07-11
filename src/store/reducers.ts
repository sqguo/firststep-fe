import { AnyAction } from "@reduxjs/toolkit";
import * as actionTypes from "./actionTypes";

const initialState: AppState = {
  currentUser: null,
  currentGroup: null,
};

const reducer = (
  state: AppState = initialState,
  action: AnyAction
): AppState => {
  switch (action.type) {
    case actionTypes.GET_USER_PROFILE:
      return state
    case actionTypes.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        currentUser: action.user,
      };
    case actionTypes.GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        currentUser: null,
      };
  }
  return state;
};

export default reducer;
