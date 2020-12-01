import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CheckCircle, Cancel } from "@material-ui/icons";
import style from "../../../styles/email.module.css";
import { editInstructor} from "../../../redux/actions/instructorActions";
import { TextField } from "@material-ui/core";

export default function BodyEditar({

  name,
  lastName,
  email,
  cohorte,
  dni,
  modalEditar,
  styles,
  setModalEditar,
}) {
  // const [modalEdit, setModalEdit] = useState(modalEditar);
  const dispatch = useDispatch();
  const [instructorSeleccionado, setInstructorSeleccionado] = useState({
    name: "",
    lasName: "",
    email: "",
    dni:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructorSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const EditFunction = () => {
    dispatch(editInstructor(email, instructorSeleccionado));
    setModalEditar(!modalEditar);
  };

  const isOpen = () => {
    console.log("ando");
    setModalEditar(!modalEditar);
  };

  return (
    <div className={styles.modal}>
      <h3>Editar Instructor</h3>
      <TextField
        className={style.inputMaterial}
        label="Nombre"
        name="name"
        onChange={handleChange}
      />
      <TextField
        className={style.inputMaterial}
        label="Apellido"
        name="lastName"
        onChange={handleChange}
      />
      <TextField
        className={style.inputMaterial}
        label="Correo"
        name="email"
        onChange={handleChange}
      />
      <TextField
        className={style.inputMaterial}
        label="Dni"
        name="dni"
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
