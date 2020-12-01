import React, { useEffect } from "react";
import { useState } from "react";
import s from "../../../styles/fichaAlumno.module.css";
import { Typography, Breadcrumbs, TextField, Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import fotoPerfil from "../../utils/fotoPerfil.jpg";
import { Link } from "react-router-dom";
import { getAllCohort } from "../../../redux/actions/cohortActions";
import { getAllGroups } from "../../../redux/actions/groupActions";
import { getStudent } from "../../../redux/actions/studentActions";
import { update_Cohort } from '../../../redux/actions/adminActions';
import { updateGroup } from '../../../redux/actions/adminActions';
import Alert from '../../alerts/migrateCohort';

const Perfil = ({ userData, toggle }) => {

	const dispatch = useDispatch();
	
  const cohorts = useSelector((store) => store.cohort.allCohort);
  const groups = useSelector((store) => store.group.allGroups);
	const user = useSelector((store) => store.student.student);

	const [migrar, setMigrar] = useState(false);
	const [migrarGroup, setMigrarGroup] = useState(false);

	const handleMigrarCohorte = () => {
	  setMigrar(true)
	}

	const cancelMigrarCohorte = () => {
		setMigrar(false)
	}

	const handleMigrarGroup = () => {
	  setMigrarGroup(true)
	}

	const cancelMigrarGroup = () => {		
		setMigrarGroup(false)
	}

	const handleChangeGroup = (e) => {
		const name = e.target.value.name
		Alert(name).then(() => {
			dispatch(updateGroup(user.code, name))
			cancelMigrarGroup()
		})
	}	

	const handleChangeCohorte = (e) => {
		const name = e.target.value.name
		Alert(name).then(() => {
		dispatch(update_Cohort(user.code, name))
		cancelMigrarCohorte()
		})
	}

  useEffect(() => {
    dispatch(getAllCohort());
    dispatch(getAllGroups());
    dispatch(getStudent(userData.code));
	}, []);

  return (
    <div>
      <div>
        <Breadcrumbs aria-label="breadcrumb" className={s.miga}>
          <Link color="inherit" onClick={toggle}>
            Cerrar
          </Link>
        </Breadcrumbs>
      </div>
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
                  {user && (
                    <div>
                      <TextField
                        disabled
                        id="standard-disabled"
                        label="Nombre"
                        value={user.name}
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
                        value={user.lastName}
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
                        value={user.dni}
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
                  )}
                </div>
              </div>
              <div className={s.info2}>
                <div className={s.form}>
                  <>
                    <h1>Cuentas Asociadas</h1>
                    <div>
                      <TextField
                        disabled
                        id="standard-disabled"
                        label="Cuenta Google"
                        value={user.email}
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
                  </>
                </div>
                <div className={s.form}>
                  <h1>Henry</h1>
                  <div className={s.infoHenry}>                   
                    <Typography>
                      Cohorte: {user.cohorte && user.cohorte.name}                      
											{ migrar ?
												<div>
												<Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" onClick={cancelMigrarCohorte}>
                          Cancelar
                        </Link>
                      </Breadcrumbs>
												<Select
                        labelId="demo-simple-select-helper-label"
												id="demo-simple-select-helper"
												onChange={handleChangeCohorte}
                      	>
                        <MenuItem value="todos">
                          <em>...</em>
                        </MenuItem>
                        {cohorts ? (
                          cohorts.map((c) => {
                            return <MenuItem value={c}>{c.name}</MenuItem>;
                          })
                        ) : (
                          <p>no hay cohortes cargados</p>
                        )}
                      </Select>
											</div>
											: 
											<Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" onClick={handleMigrarCohorte}>
                          Migrar
                        </Link>
                      </Breadcrumbs>
											}
                    </Typography>                   
                    <Typography>
                      Grupo: {user.group && user.group.name}                      
											{ migrarGroup ?
												<div>
												<Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" onClick={cancelMigrarGroup}>
                          Cancelar
                        </Link>
                      </Breadcrumbs>
												<Select
                        labelId="demo-simple-select-helper-label"
												id="demo-simple-select-helper"
												onChange={handleChangeGroup}
                      	>
                        <MenuItem value="todos">
                          <em>...</em>
                        </MenuItem>
                        {groups ? (
                          groups.map((g) => {
                            return <MenuItem value={g}>{g.name}</MenuItem>;
                          })
                        ) : (
                          <p>no hay cohortes cargados</p>
                        )}
                      </Select>
											</div>
											: 
											<Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" onClick={handleMigrarGroup}>
                          Migrar
                        </Link>
                      </Breadcrumbs>
											}
                    </Typography>

                    <label>Nombre PM´s</label>
                    <Typography>Tus PM´s en esta etapa seran:</Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
