import * as actionTypes from "../actions/actionTypes";

const initialState = {
  allUsers: [],
  allAdmins: [],
  admin: {},
  message: "",
};

const adminReducers = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.POST_USER_ADMIN:
      return {
        ...state,
        admin: state.allAdmins.concat(action.admin),
      };
    case actionTypes.GET_ALL_ADMINS:
      return {
        ...state,
        allAdmins: action.allAdmins,
      };
    case actionTypes.GET_ONE_ADMIN:
      return {
        ...state,
        admin: action.admin,
      };
    case actionTypes.GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter(item => item.code !== action.code)
      };
    case actionTypes.UPDATE_COHORT_BY_CODE:
      return {
        ...state,
        allUsers: state.allUsers.map((user) => {
          if (user.code === action.code) {
            user.cohort = action.update;
          }
          return user;
        }),
      };
    case actionTypes.UPDATE_GROUP_BY_CODE:
      return {
        ...state,
        allUsers: state.allUsers.map((user) => {
          if (user.code === action.code) {
            user.cohort = action.update;
          }
          return user;
        }),
      };
    default:
      return state;
  }
};

export default adminReducers;
