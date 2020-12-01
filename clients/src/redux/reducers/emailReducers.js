import * as actionTypes from "../actions/actionTypes";

const initialState = {
  allEmails: [],
  email: {},
  message: "",
};

const emailReducers = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.CREATE_EMAIL:
      return {
        ...state,
        allEmails: state.allEmails.concat(action.email),
      };
    case actionTypes.GET_EMAIL:
      return {
        ...state,
        allEmails: action.allEmails,
      };

    case actionTypes.PUT_EMAIL:
      return {
        ...state,
        allEmails: state.allEmails.map((email) => {
          if (email.email === action.email) {
            email.email = action.updateEmail;
          }
          return email;
        }),
      };
    case actionTypes.DELETE_EMAIL:
      return {
        ...state,
        allEmails: state.allEmails.filter(
          (email) => email.email !== action.email
        ),
        message: action.message,
      };

    default:
      return state;
  }
};

export default emailReducers;
