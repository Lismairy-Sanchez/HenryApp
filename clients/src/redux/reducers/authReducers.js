import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: {},
  message: "",
};

const authReducers = (state = initialState, action) => {
  console.log(action, "********");
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_LOCAL:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.VERIFY_LOGUIN:
      return {
        ...state,
        user: action.session,
      };
    case actionTypes.USER_LOGIN_ERROR:
      return {
        ...state,
        message: action.message,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: {},
        message: action.message,
      };
    default:
      return state;
  }
};

export default authReducers;
