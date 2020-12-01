import * as actionTypes from "./actionTypes";
import axios from "axios";

const url = "http://localhost:3001";

export const getAllGroups = () => (dispatch) => {
  axios
    .get(`${url}/group/all`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_ALL_GROUP,
        allGroups: res.data.groups,
      });
    })
    .catch((err) => console.log(err));
};

export const getOneGroup = (name) => (dispatch) => {
  axios
    .get(`${url}/group/${name}`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_GROUP_BY_NAME,
        group: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const postGroup = (newGroup) => (dispatch) => {
  axios
    .post(`${url}/group/create`, {
      newGroup: newGroup,
    })
    .then((res) => {
      dispatch({
        type: actionTypes.POST_GROUP,
        group: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//------ Asignar PM al grupo
export const putGroup = (pm, group) => (dispatch) => {
  axios
    .post(`${url}/group/pm/${pm}`, group)
    .then((res) => {
      dispatch({
        type: actionTypes.PUT_GROUP,
        updateGroup: res.data,
      });
    })
    .catch((err) => console.log(err));
};
//TODO: Falta: delete, put, put-cohorte,
