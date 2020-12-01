import * as actionTypes from "./actionTypes";
import Swal from "sweetalert2";
import Dialog from "../../Componentes/alerts/dialog";

import axios from "axios";

const url = "http://localhost:3001";

export const getAllCohort = () => (dispatch) => {
  axios
    .get(`${url}/cohort/all`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_ALL_COHORT,
        allCohort: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const updateCohort = (name, values) => async (dispatch) => {
  return await axios
    .put(`${url}/cohort/${name}`, values)
    .then((res) => {
      dispatch({
        type: actionTypes.PUT_COHORT,
        update: res.data.cohort,
        name: name,
      });
    })
    .catch((err) => console.log(err));
};

export const getOneCohort = (id) => (dispatch) => {
  axios
    .get(`${url}/cohort/${id}`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_ONE_COHORT,
        cohort: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCohort = (code) => (dispatch) => {
  const data = "cohorte";
  Dialog(data).then(async (res) => {
    if (res.isConfirmed) {
      await axios
        .delete(`${url}/cohort/${code}`)
        .then((res) => {
          dispatch({
            type: actionTypes.DELETE_COHORT,
            code: code,
            message: res.data,
          });
          Swal.fire({
            position: "center",
            icon: "success",
            title: `¡Cohorte eliminado con éxito!`,
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

export const postCohort = (name, startDate) => (dispatch) => {
  return axios
    .post(
      `${url}/cohort/create`,
      {
        name: name,
        startDate: startDate,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      dispatch({
        type: actionTypes.POST_COHORT,
        cohort: res.data.cohort,
      });
    })
    .catch((err) => console.log(err));
};

export const filterCohort = (cohort) => async (dispatch) => {
  try {
    await axios
      .get(`${url}/cohort/students?cohort=${cohort}`, { withCredentials: true })
      .then((res) => {
        dispatch({
          type: actionTypes.FILTER_COHORT,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log("error", err);
  }
};
