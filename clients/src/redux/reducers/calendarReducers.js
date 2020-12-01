import * as actionTypes from "../actions/actionTypes";

const initialState = {
    allEvents:[]
};


const calendarReducers = (state=initialState, action) => {
    
    switch (action.type) {
        case actionTypes.CREATE_EVENT:
          return {
            ...state,
            allEvents: state.allEvents.push({
                id:action._id,
                title:action.title,                     
                start:new Date(action.year, action.month-1, action.day, action.hour, action.minute), 
                end:new Date(action.endYear, action.endMonth-1, action.endDay, action.endHour, action.endMinute), 
                allDay:action.allDay
            }),
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