import * as actionTypes from "./actionTypes";
import axios from "axios";
import Toast from "../../Componentes/alerts/toast";
import Dialog from "../../Componentes/alerts/dialog";

const url = "http://localhost:3001";

/*===== Create student ===== */
export const postStudent = (user) => (dispatch) => {
  return axios
    .post(`${url}/student/create`, user, { withCredentials: true })
    .then((res) => {
      dispatch({
        type: actionTypes.POST_STUDENT,
        newUser: res.data,
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
        title: "Error al registrar el usuario",
      });
    });
};

/*===== Get all students ===== */
export const getAllStudents = () => async (dispatch) => {
  try {
    await axios
      .get(`${url}/student/all`)
      .then((res) => {
        dispatch({
          type: actionTypes.GET_ALL_STUDENTS,
          allStudents: res.data,
        });
      })
      .catch((err) => console.log(err));
  } catch {
    console.log("errro");
  }
};

/*===== Get students by code ===== */
export const getStudent = (code) => async(dispatch) => {

  try{
    const {data} = await axios.get(`${url}/student/${code}`)
    dispatch({
          type: actionTypes.GET_ONE_USER,
          student: data.user,
    });     
  } catch(err) {
    console.log(err);
    
  }
};

/*===== Edit student personal data ===== */
export const editUserData = (code, values) => (dispatch) => {
  axios
    .put(`${url}/student/${code}`, values)
    .then((res) => {
      dispatch({
        type: actionTypes.PUT_STUDENT,
        update: res.data,
        code: code,
      });
    })
    .catch((err) => console.log(err));
};
