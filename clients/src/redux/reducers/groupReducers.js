import * as actionTypes from "../actions/actionTypes";

const initialState = {
  allGroups: [],
  group: {},
  message: "",
};
//TODO: falta finalizar actions de group
//TODO: getOnegroup
const groupReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_GROUP:
      return {
        ...state,
        allGroups: state.allGroups.concat(action.group),
      };
    case actionTypes.GET_ALL_GROUP:
      return {
        ...state,
        allGroups: action.allGroups,
      };

    case actionTypes.PUT_GROUP:
      return {
        ...state,
        allGroups: state.allGroups.map((group) => {
          if (group.code === action.updateGroup) {
            group = action.updateGroup;
          }
          return group;
        }),
      };

    default:
      return state;
  }
};

export default groupReducers;
