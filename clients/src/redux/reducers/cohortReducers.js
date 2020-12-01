import * as actionTypes from "../actions/actionTypes";

const initialState = {
  allCohort: [],
  cohort: {},
  message: "",
};

const cohortReducers = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.POST_COHORT:
      return {
        ...state,
        allCohort: state.allCohort.concat(action.cohort),
      };
    case actionTypes.GET_ALL_COHORT:
      return {
        ...state,
        allCohort: action.allCohort,
      };
    case actionTypes.GET_ONE_COHORT:
      return {
        ...state,
        cohort: action.cohort,
      };
    case actionTypes.PUT_COHORT:
      return {
        ...state,
        allCohort: state.allCohort.map((cohort) => {
          if (cohort.name === action.name) {
            cohort = action.update;
          }
          return cohort;
        }),
      };

    case actionTypes.DELETE_COHORT:
      return {
        ...state,
        allCohort: state.allCohort.filter((item) => item.code !== action.code),
      };
    case actionTypes.FILTER_COHORT:
      return {
        cohort: action.payload,
      };
    default:
      return state;
  }
};

export default cohortReducers;
