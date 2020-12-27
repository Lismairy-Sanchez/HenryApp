import * as actionTypes from "../actions/actionTypes";

const initialState = {
    allEvents:[]
};


const calendarReducers = (state=initialState, action) => {
    console.log('mostrar action',action)
    switch (action.type) {
        case actionTypes.CREATE_EVENT:
          return {
            ...state,
            
          };


          case actionTypes.GET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.allEvents
               
      };

      case actionTypes.DELETE_EVENT:
          return {
              ...state,
              allEvents: state.allEvents.filter(
                (event) => event.title !== action.title
              ),
          }
          default:
      return state;
}
}

export default calendarReducers;