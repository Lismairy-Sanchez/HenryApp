import * as actionTypes from "./actionTypes";
import axios from "axios";
import Toast from "../../Componentes/alerts/toast";

const url = "http://localhost:3001";

/*====  Post instructor ====== */
export const postInstructor = (user) => (dispatch) => {
  return axios
    .post(`${url}/instructor/`, user)
    .then((res) => {
      dispatch({
        type: actionTypes.POST_INSTRUCTOR,
        instructor: res.data,
      });
      Toast.fire({
        icon: "success",
        title: `Se registro el usuario: ${user.name}`,
      });
    })
    .catch((err) => {
      dispatch({
        error: err,
      });
      Toast.fire({
        icon: "error",
        title: "Error al registrarse",
      });
    });
};

/*==== Get all instructors ==== */
export const getAllInstructors = () => (dispatch) => {
  axios
    .get(`${url}/instructor/all`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_ALL_INSTRUCTORS,
        allInstructor: res.data,
      });
    })
    .catch((err) => console.log(err));
};

/*===== Edit Instructor data =====*/
export const editInstructor = (code, values) => (dispatch) => {
  axios
    .put(`${url}/instructor/${code}`, values)
    .then((res) => {
      dispatch({
        type: actionTypes.PUT_INSTRUCTOR,
        update: res.data,
      });
    })
    .catch((err) => console.log(err));
};
