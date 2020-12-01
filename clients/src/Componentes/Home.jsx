import React, { useEffect } from "react";
import s from "../styles/home.module.css";
import {
  AppBar,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import Footer from "../Componentes/Footer";
import logo from "./utils/LogoHenry.png";
import home from "./utils/Home3.jpg";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifySession } from "../redux/actions/authActions";
import { logout } from "../redux/actions/authActions";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(verifySession());
  }, []);
  console.log(user, "+++++++++");
  const logoutSession = () => {
    dispatch(logout(history));
  };
  const endSession = () => {
    return (
      <Typography variant="h6" color="inherit" className={s.link2}>
        {user && <div onClick={logoutSession}>Logout</div>}
      </Typography>
    );
  };
  return (
    <div className={s.cont_prin}>
      <AppBar position="static" className={s.menu}>
        <Toolbar variant="dense" className={s.cont_nav}>
          <img src={logo} alt="" />
          <Typography variant="h6" color="inherit" className={s.link}>
            {user ? (
              user.role === "student" ? (
                <>
                  <Link
                    to="/alumnos"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {" "}
                    Alumno{" "}
                  </Link>
                  {endSession()}
                </>
              ) : user.role === "instructor" ? (
                <>
                  <Link
                    to="/instructor"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {" "}
                    Instructor{" "}
                  </Link>
                  {endSession()}
                </>
              ) : user.role === "admin" ? (
                <>
                  <Link
                    to="/admin"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {" "}
                    Admin{" "}
                  </Link>
                  {endSession()}
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {" "}
                    Login{" "}
                  </Link>
                  <Link
                    to="/registrarse"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {" "}
                    Registrarse{" "}
                  </Link>
                </>
              )
            ) : null}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={s.img}>
        <div className={s.text}>
          <h6>BIENVENIDO</h6>
          <p>
            A tu campus virtual donde podras interactuar con toda la comunidad
            de HENRY
          </p>
          <div className={s.cont_selec}>
            <InputLabel className={s.label}>Ingresar como:</InputLabel>
            <FormControl className={s.formControl}>
              <Select
                className={s.select}
                native
                inputProps={{
                  name: "age",
                  id: "age-native-simple",
                }}
              >
                {/* <option aria-label="None" value="" /> */}
                <option value={10}>Alumno</option>
                <option value={20}>Instructor</option>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className={s.imgen}>
          <img src={home} alt="" />
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default Home;
