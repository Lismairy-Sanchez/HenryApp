import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const { edit, nameRow } = props;
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [Name, setName] = useState("");
  const [Fecha, setFecha] = useState("");

  const handleOpen = () => {
    setOpen(!open);
  };

  const setData = () => {
    edit(nameRow, { name: Name, startDate: Fecha });
    setOpen(!open);
    Swal.fire({
      position: "center",
      icon: "success",
      title: `¡El modulo se ha creado con exito!`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleOpen}
      >
        editar cohorte
      </Button>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
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
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <form
              className="date"
              noValidate
              onChange={(e) => setFecha(e.target.value)}
            >
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

            <Button variant="contained" color="primary" onClick={setData}>
              Enviar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
