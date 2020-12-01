import * as actionTypes from "./actionTypes";
import axios from "axios";
import Toast from "../../Componentes/alerts/toast";
import Dialog from "../../Componentes/alerts/dialog";
import { getStudent } from './studentActions';

const url = "http://localhost:3001";

/*===== Add new admin ====== */
export const postAdmin = (user) => async (dispatch) => {
  return await axios
    .post(`${url}/admin/`, user)
    .then((res) => {
      dispatch({
        type: actionTypes.POST_USER_ADMIN,
        admin: res.data,
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

/*===== Get all admins ====== */
export const getAllAdmins = () => (dispatch) => {
  axios
    .get(`${url}/admin/all`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_ALL_ADMINS,
        allAdmins: res.data,
      });
    })
    .catch((err) => console.log(err));
};

/*===== Get one admin ====== */
export const getOneAdmin = (code) => (dispatch) => {
  axios
    .get(`${url}/admin/${code}`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_ONE_ADMIN,
        admin: res.data,
      });
    })
    .catch((err) => console.log(err));
};

/*===== Get all users (students-instructors-admins) ====== */
export const getAllUsers = () => (dispatch) => {
  axios
    .get(`${url}/admin/users`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_ALL_USERS,
        allUsers: res.data,
      });
    })
    .catch((err) => console.log(err));
};

/*========== promover student-instructor ==========0 */
// export const update_Cohort = (code, cohort) => (dispatch) => {
//   return axios
//     .put(`${url}/admin/cohort/${code}/${cohort}`)
//     .then((res) => {
//       dispatch({
//         type: actionTypes.UPDATE_COHORT_BY_CODE,
//         update: res.data,
//         code: code,
//       });
//     })
//     .catch((err) => console.log(err));
// };

/*===== Delete user by code (admin, instructor o admin)===== */
export const deleteStudent = (code, type) => (dispatch) => {
  Dialog().then(async(res) => {
    if (res.isConfirmed) {
      await axios
        .delete(`${url}/admin/${code}`)
        .then((res) => {
          if(type === "instructor"){
            dispatch({
              type: actionTypes.DELETE_INSTRUCTOR,
              message: `Delete user with code: ${code}`,
              code: code
            });
          }
          else if(type === "student"){
            dispatch({
              type: actionTypes.DELETE_USER,
              message: `Delete user with code: ${code}`,
              code: code
            });
          }
          
        })
        .catch((err) => console.log(err));
    }
  });
};

/*===== Update student/instructor - Cohort ===== */
export const update_Cohort = (code, cohort) => (dispatch) => {
  return axios
    .put(`${url}/admin/cohort/${code}/${cohort}`)
    .then((res) => {
      dispatch(getStudent(code));
      dispatch({
        type: actionTypes.UPDATE_COHORT_BY_CODE,
        update: res.data,
        code: code,
      });
    })
    .catch((err) => console.log(err));
};

/*===== Update student/instructor - group===== */
export const updateGroup = (code, group) => (dispatch) => {
  return axios
    .put(`${url}/admin/group/${code}/${group}`)
    .then((res) => {
      dispatch(getStudent(code));
      dispatch({
        type: actionTypes.UPDATE_GROUP_BY_CODE,
        code: code, //group
        update: group,
      });
    })
    .catch((err) => console.log(err));
};
