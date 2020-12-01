import * as actionTypes from "./actionTypes";
import axios from "axios";
import Swal from "sweetalert2";
import Toast from "../../Componentes/alerts/toast";
import { getOneCohort } from "./cohortActions";

const url = "http://localhost:3001";
/*==== Login users local ==== */
export const authLogin = (email, password) => (dispatch) => {
  try {
    axios
      .post(
        `${url}/auth/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch({
          type: actionTypes.AUTH_LOGIN_LOCAL,
          user: res.data.user,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: `¡Bienvenido!`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: "Error: email o contraseña no válidos",
        });
      });
  } catch {
    dispatch({
      type: actionTypes.USER_LOGIN_ERROR,
      message: "Error de login",
    });
  }
};

export const verifySession = () => async (dispatch) => {
  try {
    await axios
      .get(`${url}/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: actionTypes.VERIFY_LOGUIN,
          session: res.data,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const logout = (history) => (dispatch) => {
  Swal.fire({
    html: `<h5>¿Deseas cerrar sesión?<h5/>`,
    width: "30%",
    icon: "info",
    showCancelButton: true,
    customClass: {
      confirmButton: "btn btn-sm btn-primary",
      cancelButton: "btn btn-sm btn-default border",
    },
    cancelButtonText: "Cancelar",
    confirmButtonText: "Cerrar sesión",
  })
    .then(async (res) => {
      if (res.isConfirmed) {
        await axios
          .post(`${url}/auth/logout`, null, { withCredentials: true })
          .then((res) => {
            Swal.fire("¡Has cerrado sesión!", `Hasta la proxima`, "info");
            history.push("/");
            dispatch({
              type: actionTypes.LOGOUT,
            });
          });
      }
    })
    .catch((err) => console.log(err));
};
