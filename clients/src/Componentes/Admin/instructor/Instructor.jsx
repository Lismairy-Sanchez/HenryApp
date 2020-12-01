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
import style from "../../../styles/instructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postInstructor, getAllInstructors} from "../../../redux/actions/instructorActions";
import {deleteStudent} from "../../../redux/actions/adminActions"
import BodyEditar from "./bodyEditar";
import { AutoSizer } from "@material-ui/data-grid";

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
    top: "20%",
    left: "40%",
    transform: "translate (-50%, -50%)",
  },
}));

export default function Instructor() {
  const styles = useStyles();
  //-------Hooks----
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [instructorSeleccionado, setInstructorSeleccionado] = useState({
    name:"",
    lasName:"",
    email:"",
    cohorte:"",
    dni:"",
    password:""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructorSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const instructor = useSelector((state) => state.instructor.allInstructor);
  console.log(instructor, "*******Instructor")

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllInstructors());
  }, []);

  const Aceptar = () => {
    //prettier-ignore
    dispatch(postInstructor(instructorSeleccionado));
    AbrirCerrar();
  };

  const deleteEm = (code) => {
    const type = "instructor"
    dispatch(deleteStudent(code, type));
   
  };

  //Funcion para abrir y cerrar el modal
  const AbrirCerrar = () => {
    setModalInsertar(!modalInsertar);
  };

  //Funcion para abrir y cerrar el modal al Editar
  const Editar = () => {
    setModalEditar(!modalEditar);
  };


  return (
    <div>
    <div >
      <h3 style={{textAlign:"center"}}>Instructores Henry</h3>
    <div>
      <TableContainer >
        <Table  className={style.cont_table}>
          <TableHead >
            <TableRow >
              <TableCell align="center" padding="none">
                <h3 >
                  <b>Nombre</b>
                </h3>
              </TableCell>
              <TableCell align="center" padding="none">
                <h3>
                  <b>Apellido</b>
                </h3>
              </TableCell>
              <TableCell align="center" padding="none">
                <h3 >
                  <b>Correo</b>
                </h3>
              </TableCell>
              <TableCell align="center" padding="none">
                <h3 >
                  <b>Cohorte</b>
                </h3>
              </TableCell>
              <TableCell align="center" padding="none">
                <h3 >
                  <b>DNI</b>
                </h3>
              </TableCell>
              <TableCell align="center" padding="none">
                <h3 >
                  <b>Acciones</b>
                </h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructor && instructor.map((newInstructor, idx) => (
              <TableRow >
                <TableCell key={idx} component="th" scope="row" padding="none" align="center" >
                  {newInstructor.name}
                </TableCell>
                <TableCell key={idx} component="th" scope="row" padding="none" align="center" >
                  {newInstructor.lastName}
                </TableCell>
                <TableCell key={idx} component="th" scope="row" padding="none" align="center" >
                  {newInstructor.email}
                </TableCell>
                <TableCell key={idx} component="th" scope="row" padding="none" align="center" >
                  {newInstructor.cohorte && newInstructor.cohorte.name}
                </TableCell>
                <TableCell key={idx} component="th" scope="row" padding="none" align="center" >
                  {newInstructor.dni}
                </TableCell>
                <TableCell key={idx} component="th" scope="row" align="right" padding="none" >
                  <Button onClick={Editar} className={style.botonEdit}>
                    <Edit className={style.editar} />
                  </Button>
                  <Modal open={modalEditar}>
                    <BodyEditar
                      name={newInstructor.name}
                      lastName={newInstructor.lastName}
                      email={newInstructor.email}
                      cohorte={newInstructor.cohorte && newInstructor.cohorte.name}
                      dni={newInstructor.dni}
                      modalEditar={modalEditar}
                      setModalEditar={setModalEditar}
                      styles={styles}
                    />
                  </Modal>
                  &nbsp; &nbsp; &nbsp;
                  <Button onClick={() => deleteEm(newInstructor.code)}>
                    <Delete className={style.delete} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
    </div>
  );
}
