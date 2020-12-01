import React from "react";
import { useState } from "react";
import s from "../styles/perfilUser.module.css";
import { Typography, Breadcrumbs, TextField, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import fotoPerfil from "../Componentes/utils/fotoPerfil.jpg";
import { editUserData } from "../redux/actions/studentActions";
import { Link } from "react-router-dom";
import Bienvenida from "./Bienvenida";
import Footer from "./Footer";

const Perfil = ({ user }) => {
  const dispatch = useDispatch();
  
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    name: "",
    lastName: "",
    dni: null,
    city: "",
    googleId: "",
    githubId: "",
  });

  const Editar = () => {
    setEdit(!edit);
  };

  const update = () => {
    dispatch(editUserData(user.code, data));
    Editar();
  };

  const handlerChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Bienvenida />
      {user && user.role !== "admin" ? (
        <Breadcrumbs aria-label="breadcrumb" className={s.miga}>
          <Link color="inherit" to="/alumnos">
            Alumno
          </Link>
          <Link color="inherit" to="/admin/perfil">
            Perfil
          </Link>
        </Breadcrumbs>
      ) : (
        <Breadcrumbs aria-label="breadcrumb" className={s.miga}>
          <Link color="inherit" to="/admin">
            Administrador
          </Link>
          <Link color="inherit" to="/student/perfil">
            Perfil
          </Link>
        </Breadcrumbs>
      )}
      {user && (
        <div className={s.cont_print}>
          <div className={s.todo}>
            <div className={s.cont_info}>
              <div className={s.info}>
                <div className={s.perfil}>
                  <div className={s.img}>
                    <img src={fotoPerfil} alt="" />
                  </div>
                  <div className={s.nombre}>
                    <h1>{user.name}</h1>
                  </div>
                </div>
                <div className={s.form}>
                  <h1>Datos Personales</h1>
                  {!edit ? (
                    <div>
                      <TextField
                        disabled
                        id="standard-disabled"
                        label="Nombre"
                        defaultValue={user.name}
                        style={{ margin: 8, width: "90%" }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        disabled
                        id="standard-disabled"
                        label="Apellido"
                        defaultValue={user.lastName}
                        style={{ margin: 8, width: "90%" }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        disabled
                        id="standard-disabled"
                        label="DNI"
                        defaultValue={user.dni}
                        style={{ margin: 8, width: "90%" }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        disabled
                        id="standard-disabled"
                        label="Ciudad"
                        style={{ margin: 8, width: "90%" }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <TextField
                        id="standard-full-width"
                        label="Nombre"
                        style={{ margin: 8, width: "90%" }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        name="name"
                        onChange={handlerChange}
                      />
                      <TextField
                        id="standard-full-width"
                        label="Apellido"
                        style={{ margin: 8, width: "90%" }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        name="lastName"
                        onChange={handlerChange}
                      />
                      <TextField
                        id="standard-full-width"
                        label="DIN"
                        style={{ margin: 8, width: "90%" }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        name="dni"
                        onChange={handlerChange}
                      />
                      <TextField
                        id="standard-full-width"
                        label="Ciudad"
                        style={{ margin: 8, width: "90%" }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        name="city"
                        onChange={handlerChange}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className={s.info2}>
                <div className={s.form}>
                  <>
                    <h1>Cuentas Asociadas</h1>
                    {!edit ? (
                      <div>
                        <TextField
                          disabled
                          id="standard-disabled"
                          label="Cuenta Google"
                          defaultValue={user.email}
                          style={{ margin: 8, width: "90%" }}
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <TextField
                          disabled
                          id="standard-disabled"
                          label="Cuenta GitHub"
                          style={{ margin: 8, width: "90%" }}
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                    ) : (
                      <div>
                        <TextField
                          id="standard-full-width"
                          label="Cuenta Google"
                          defaultValue="nvlozano34@gmail"
                          style={{ margin: 8, width: "90%" }}
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          name="googleId"
                          onChange={handlerChange}
                        />
                        <TextField
                          id="standard-full-width"
                          label="Cuenta GitHub"
                          style={{ margin: 8, width: "90%" }}
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          name="githubId"
                          onChange={handlerChange}
                        />
                      </div>
                    )}
                  </>
                </div>
                {user.role !== "admin" ? (
                  <div className={s.form}>
                    <h1>Henry</h1>
                    <div className={s.infoHenry}>
                      <label>Cohorte</label>
                      <Typography>
                        Perteneces al Cohorte:{" "}
                        {user.cohorte && user.cohorte.name}
                      </Typography>

                      <label>Instructor</label>
                      <Typography>Tu instructor este Cohorte sera:</Typography>

                      <label>Equipo PP</label>
                      <Typography>
                        Tus compañeros de PP esta semana son:
                      </Typography>

                      <label>Nombre PM´s</label>
                      <Typography>Tus PM´s en esta etapa seran:</Typography>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className={s.butons}>
              {edit ? (
                <>
                  <Button
                    className={s.button}
                    variant="contained"
                    color="default"
                    onClick={Editar}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className={s.button2}
                    variant="contained"
                    color="default"
                    onClick={update}
                  >
                    Aceptar
                  </Button>
                </>
              ) : (
                <Button
                  className={s.button}
                  variant="contained"
                  color="default"
                  onClick={Editar}
                >
                  Editar
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Perfil;
