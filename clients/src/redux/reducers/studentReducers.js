import * as actionTypes from "../actions/actionTypes";

const initialState = {
  allStudents: [],
  student: {},
  message: "",
};

const studentReducers = (state = initialState, action) => {
  console.log(action, "****action*****")
  switch (action.type) {
    case actionTypes.POST_STUDENT:
      return {
        ...state,
        allStudent: state.allStudents.concat(action.newUser),
      };
    case actionTypes.GET_ALL_STUDENTS:
      return {
        ...state,
        allStudents: action.allStudents,
      };
    case actionTypes.GET_ONE_USER:
      return {
        ...state,
        student: action.student,
      };

    case actionTypes.PUT_STUDENT:
      return {
        ...state,
        allStudents: state.allStudents.map((user) => {
          if (user.code === action.code) {
            user = action.update;
          }
          return user;
        }),
      };
    default:
      return state;
  }
};

export default studentReducers;
