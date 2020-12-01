import * as actionTypes from "./actionTypes";
import axios from "axios";
import Toast from "../../Componentes/alerts/toast";
import Dialog from "../../Componentes/alerts/dialog";

const url = "http://localhost:3001"

export const postCalendar = (event) => async (dispatch) => {
    return await axios
      .post(`${url}/calendar/create`, event)
      .then((res) => {
        dispatch({
          type: actionTypes.CREATE_EVENT,
          event: res.data,
        });
        Toast.fire({
          icon: "success",
          title: `Se registro el evento: ${event.title}`,
        });
      })
      .catch((err) => {
        dispatch({
          error: err,
        });
        Toast.fire({
          icon: "error",
          title: "Error al crear evento",
        });
      });
  };

  export const getAllEvents = () => async (dispatch) => {
    try {
      await axios
        .get(`${url}/calendar/all`)
        .then((res) => {
          var allTheEvents=res.data
          var newConfigEvents=allTheEvents.map((evento)=>{
            return evento={
                id:evento._id,
                title:evento.title,                     
                start:new Date(evento.year, evento.month-1, evento.day, evento.hour, evento.minute), 
                end:new Date(evento.endYear, evento.endMonth-1, evento.endDay, evento.endHour, evento.endMinute), 
                allDay:evento.allDay
            }
          })
          console.log("que goma es esto???",newConfigEvents)
          dispatch({
            
            type: actionTypes.GET_ALL_EVENTS,
            allEvents: newConfigEvents,
          });
        })
        .catch((err) => console.log(err));
    } catch {
      console.log("error");
    }
  };


export const deleteEvent = (title) => (dispatch) => {
  axios
    .delete(`${url}/calendar/${title}`)
    .then((res) => {
      dispatch({
        type: actionTypes.DELETE_EVENT,
        title: title,
      });
    })
    .catch((err) => console.log(err));
};