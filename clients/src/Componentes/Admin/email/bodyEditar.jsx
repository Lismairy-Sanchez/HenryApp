import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CheckCircle, Cancel } from "@material-ui/icons";
import style from "../../../styles/email.module.css";
import { putEmail } from "../../../redux/actions/email";
import { TextField } from "@material-ui/core";

export default function BodyEditar({
  email,
  modalEditar,
  styles,
  setModalEditar,
}) {
  // const [modalEdit, setModalEdit] = useState(modalEditar);
  const dispatch = useDispatch();
  const [emailSeleccionado, setEmailSeleccionado] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const EditFunction = () => {
    dispatch(putEmail(email, emailSeleccionado));
    setModalEditar(!modalEditar);
  };

  const isOpen = () => {
    console.log("ando");
    setModalEditar(!modalEditar);
  };

  return (
    <div className={styles.modal}>
      <h3>Editar email</h3>
      <TextField
        className={style.inputMaterial}
        label="Email"
        name="email"
        onChange={handleChange}
      />
      <br />
      <br />
      <div aling="right">
        <CheckCircle className={style.aceptar} onClick={EditFunction} />
        &nbsp; &nbsp; &nbsp;
        <Cancel className={style.cancelar} onClick={isOpen} />
      </div>
    </div>
  );
}
