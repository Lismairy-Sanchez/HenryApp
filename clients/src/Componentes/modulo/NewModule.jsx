import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import Tabla2 from "./Tabla2.jsx";
import Chip from "./Chip.jsx";
import "./NewModule.css";
import Footer from "../Footer";
import Clases from "../../Componentes/Instructor/Clases/clases"

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #ffff01 90%, #ffff01 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgb(101, 91, 17, .3)",
    color: "black",
    height: 48,
    padding: "0 30px",
  },
});

export default function NewModule() {
  const [cohorts, setCohorts] = useState([]);
  const [students, setStudents] = useState([{}]);
  const [students2, setStudents2] = useState([{}]);
  const [cohort, setCohort] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [recursos, setRecursos] = useState([]);
  const [date, setDate] = useState("");
  const [nombre, setNombre] = useState("");
  const [module, setModule] = useState("");
  const [create, setCreate] = useState(false);
  const [clases, setClases] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    Axios.get("http://localhost:3001/cohort/all")
      .then((res) => {
        setCohorts(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    Axios.get("http://localhost:3001/student/all")
      .then((res) => {
        setStudents(res.data);
        setStudents2(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => { }, [students2, cohort]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/module/${nombre}`)
      .then((res) => { setModule(res.data.id) })
      .catch((err) => {
        console.log(err.message);
      });
  }, [create]);

  useEffect(() => {
    Axios.put("http://localhost:3001/module/asignate", {
      _id: module,
      students: selectedStudents,
    })
      .then((data) => { })
      .catch((err) => {
        console.log(err.message);
      });
  }, [module]);

  function filter(arr, coho) {
    var newarr = [{}];
    console.log(arr);
    arr.map((a) => {
      if (a.cohorte !== undefined && a.cohorte !== null) {
        if (a.cohorte.name === coho.name) {
          newarr.push(a);
        }
      }
    });
    return newarr;
  }

  function handleChange(e) {
    e.preventDefault();
    setCohort(e.target.value);
    if (e.target.value === "todos") {
      setStudents2(students);
    } else {
      setStudents2(filter(students, e.target.value));
    }
  }
  function hadleDate(e) {
    e.preventDefault();
    setDate(e.target.value);
  }
  function handleName(e) {
    e.preventDefault();
    setNombre(e.target.value);
  }
  function handleRecursos(arr) {
    setRecursos(arr);
  }
  function handleSelectedStudent(arr) {
    setSelectedStudents(arr);
  }
  function handleSend() {
    let arr = [];
    let cla = [];
    recursos.map((e) => {
      if (e.label) {
        arr.push(e.label);
      }
    });
    clases.map((e) => {
      if (e.label) {
        cla.push(e.label);
      }
    });
    console.log(cla)
    Axios.post("http://localhost:3001/clases/create", { link: cla, cohorte: cohort._id }).then((res) => {
      console.log(res.data)
    }).catch(err => {
      console.log(err.message)
    })
    Axios.post("http://localhost:3001/module/create", {
      name: nombre,
      students: selectedStudents,
      cohorte: cohort._id,
      checkpoint: date,
      means: arr,
    })
      .then((res) => {
        setCreate(true);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `¡El modulo se ha creado con exito!`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function handleClases(arr) {
    setClases(arr);
  }

  return (
    <div>
      <Container fixed>
        <div className="titulo">
          <h3>Crear nuevo modulo</h3>
        </div>
        <div className="contededorModulo">
        <form className="form__newmodule" noValidate autoComplete="off">
          <TextField id="standard-basic" label="Nombre" onChange={handleName} />
          <FormControl className="form__cohorts">
            <InputLabel id="demo-simple-select-helper-label">
              Cohortes
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange}
            >
              <MenuItem value="todos">
                <em>...</em>
              </MenuItem>
              {cohorts.length !== 0 ? (
                cohorts.map((c) => {
                  return <MenuItem value={c}>{c.name}</MenuItem>;
                })
              ) : (
                  <p>no hay cohortes cargados</p>
                )}
            </Select>
            <FormHelperText>
              Seleccione un cohorte para el modulo
            </FormHelperText>
          </FormControl>
          <form className="date" noValidate onChange={hadleDate}>
            <TextField
              id="date"
              label="Checkpoint"
              type="date"
              defaultValue="2020-18-11"
              className="date__select"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <Button className={classes.root} onClick={handleSend}>
            Crear
          </Button>
        </form>
        <Clases recursos={handleClases} />
        <Chip recursos={handleRecursos} />

        <Tabla2 students={students2} selected={handleSelectedStudent} />
        </div>
      </Container>


    </div>
  );
}
