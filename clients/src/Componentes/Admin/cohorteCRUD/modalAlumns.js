import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Transfer from "./trasnferList";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "../../../redux/actions/studentActions";

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
  const dispatch = useDispatch();
  const { nameRow } = props;
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const users = useSelector((state) => state.student.allStudents);

  //filtra los alumnos que no tienen cohorte asignado
  const [usersClean, setUsersClean] = useState([]);
  console.log("filtro cohorte", usersClean);

  const filter = (users) => {
    const filtered = users.filter((user) => !user.cohorte);
    return filtered;
  };

  useEffect(() => {
    dispatch(getAllStudents());
    setUsersClean(filter(users));
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleOpen}
      >
        Agregar alumno
      </Button>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Transfer
          nameRow={nameRow}
          users={usersClean}
          handleOpen={handleOpen}
        />
      </Modal>
    </div>
  );
}
