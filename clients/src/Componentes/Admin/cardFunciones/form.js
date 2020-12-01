import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { postCohort, getAllCohort } from "../../../redux/actions/cohortActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function BasicTextFields({ open, handleOpen }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [Name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleOnchange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleOnchange_2 = (e) => {
    e.preventDefault();
    setDate(e.target.value);
  };

  function sendData() {
    dispatch(postCohort(Name, date));
    handleOpen();
    Swal.fire({
      position: "center",
      icon: "success",
      title: `¡El modulo se ha creado con exito!`,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        width: "400px",
        position: "relative",
        left: "35%",
        top: "30%",
      }}
    >
      <div style={{ margin: "25px auto" }}>
        <TextField
          id="outlined-basic"
          label="Nombre de cohorte"
          variant="outlined"
          style={{ marginBottom: "10px" }}
          onChange={handleOnchange}
        />
        <form className="date" noValidate onChange={handleOnchange_2}>
          <TextField
            id="date"
            label="Cohorte"
            type="date"
            defaultValue="2020-18-11"
            className="date__select"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>

        <Button variant="contained" color="primary" onClick={sendData}>
          Enviar
        </Button>
      </div>
    </form>
  );
}
