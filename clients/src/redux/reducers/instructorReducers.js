import * as actionTypes from "../actions/actionTypes";

const initialState = {
  allInstructor: [],
  instructor: {},
  message: "",
};

const instructorReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_INSTRUCTOR:
      return {
        ...state,
        allInstructor: state.allInstructor.concat(action.instructor),
      };
    case actionTypes.GET_ALL_INSTRUCTORS:
      return {
        ...state,
        allInstructor: action.allInstructor,
      };

    case actionTypes.PUT_INSTRUCTOR:
      return {
        ...state,
        allInstructor: state.allInstructor.map((inst) => {
          if (inst.code === action.update.code) {
            inst = action.update;
          }
          return inst;
        }),
      };

      case actionTypes.DELETE_INSTRUCTOR :
        return{
          ...state,
          allInstructor: state.allInstructor.filter(item => item.code !== action.code)
        }

    default:
      return state;
  }
};

export default instructorReducers;
