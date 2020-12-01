import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  TextField,
  Button,
} from "@material-ui/core";
import {
  Edit,
  Delete,
  AddCircle,
  CheckCircle,
  Cancel,
} from "@material-ui/icons";
import Swal from "sweetalert2";
import style from "../../../styles/email.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmail,
  getEmail,
  createEmail,
} from "../../../redux/actions/email";
import BodyEditar from "./bodyEditar";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    border: "2px solid #000",
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    top: "30%",
    left: "40%",
    transform: "translate (-50%, -50%)",
  },
}));

export default function Emails() {
  const styles = useStyles();
  //-------Hooks----
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
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

  const emails = useSelector((state) => state.email.allEmails);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmail());
  }, []);

  const Aceptar = () => {
    //prettier-ignore
    dispatch(createEmail(emailSeleccionado));
    AbrirCerrar();
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Invitación enviada!`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const deleteEm = (email) => {
    dispatch(deleteEmail(email));
    Swal.fire({
      position: "center",
      icon: "success",
      title: `¡Email Eliminado!`,
      showConfirmButton: false,
      timer: 2000,
    });
  };
  //Funcion para abrir y cerrar el modal
  const AbrirCerrar = () => {
    setModalInsertar(!modalInsertar);
  };

  //Funcion para abrir y cerrar el modal al Editar
  const Editar = () => {
    setModalEditar(!modalEditar);
    Swal.fire({
      position: "center",
      icon: "success",
      title: `¡El email se ha editado!`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3 className={style.h3}>Agregar Nuevo email</h3>
      <TextField
        className={style.inputMaterial}
        label="Email"
        name="email"
        onChange={handleChange}
      />
      <br />
      <br />
      <div aling="center">
        <CheckCircle
          className={style.aceptar}
          fontSize="large"
          onClick={Aceptar}
        />
        &nbsp; &nbsp; &nbsp;
        <Cancel
          className={style.cancelar}
          fontSize="large"
          onClick={AbrirCerrar}
        />
      </div>
    </div>
  );

  return (
    <div className={style.cont_prinEmail}>
    <div className={style.cont_email}>
      <h1>Agregar Nuevo Correo</h1>
    <div className={style.emails}>
      <TableContainer >
        <Table className={style.table} >
          <TableHead >
            <TableRow className={style.titleEmail}>
              <TableCell align="center" padding="none">
                <h3 >
                  <b>Email</b>
                </h3>
              </TableCell>
              <TableCell align="center" padding="none">
                <h3>
                  <b>Acciones</b>
                </h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emails.map((newEmail, idx) => (
              <TableRow key={idx}>
                <TableCell component="th" scope="row" padding="none" align="center" className={style.emailNew}>
                  {newEmail.email}
                </TableCell>
                <TableCell component="th" scope="row" align="right" padding="none" className={style.acciones}>
                  <Button onClick={Editar} className={style.botonEdit}>
                    <Edit className={style.editar} />
                  </Button>
                  <Modal open={modalEditar}>
                    <BodyEditar
                      email={newEmail.email}
                      modalEditar={modalEditar}
                      setModalEditar={setModalEditar}
                      styles={styles}
                    />
                  </Modal>
                  &nbsp; &nbsp; &nbsp;
                  <Button onClick={() => deleteEm(newEmail.email)}>
                    <Delete className={style.delete} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={modalInsertar} onClose={AbrirCerrar}>
        {bodyInsertar}
      </Modal>
      <div className={style.addEmail}>
      <AddCircle className={style.add} fontSize="large" onClick={AbrirCerrar} />
      </div>
    </div>
    </div>
    </div>
  );
}
