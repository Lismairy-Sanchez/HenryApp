import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import AddAlumn from "./modalAlumns";
import EditCohort from "./modalEditCohort";
import { Delete } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import {
  deleteCohort,
  getAllCohort,
} from "../../../redux/actions/cohortActions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Crud({ data, edit, showStudents }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCohort());
  }, []);

  const deleteEm = (code) => {
    dispatch(deleteCohort(code));
  };

  console.log(data, "******************************");

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>cohorte</TableCell>
            <TableCell align="right">Fecha de inicio</TableCell>
            <TableCell align="right">Agregar</TableCell>
            <TableCell align="right">Editar</TableCell>
            <TableCell align="right">Ir</TableCell>
            <TableCell align="right">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.startDate}</TableCell>
                <TableCell align="right">
                  <AddAlumn nameRow={row.name} />
                </TableCell>
                <TableCell align="right">
                  <EditCohort nameRow={row.name} edit={edit} />
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => showStudents(row.name)}>
                    Ver alumnos
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteEm(row.code)}>
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Crud;
