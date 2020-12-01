import React from "react";
import s from "../styles/navbar.module.css";
import { AppBar, Toolbar, Typography, Avatar } from "@material-ui/core";
import logo from "../Componentes/utils/LogoHenry.png";
import { useDispatch, useSelector } from "react-redux";

import { Link, useHistory } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

const Navbar = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutSession = () => {
    dispatch(logout(history));
  };

  return (
    <div className={s.cont_prin}>
      <AppBar position="static" className={s.menu}>
        <Toolbar variant="dense" className={s.cont_nav}>
          <Typography variant="h6" color="inherit" className={s.link}>
            Hola! {user && user.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="static" className={s.menu2}>
        <Toolbar variant="dense" className={s.cont_nav2}>
          <Link to="/">
            <img src={logo} />
          </Link>
          <Typography variant="h6" color="inherit" className={s.link2}>
            {user && user.role === "admin" ? (
              <>
                <Avatar className={s.avatar}>{user && user.name[0]}</Avatar>
                <Link to="/admin/perfil" color="inherit">
                  {" "}
                  Mi Perfil{" "}
                </Link>
              </>
            ) : user.role === "student" ? (
              <>
                <Avatar className={s.avatar}>{user && user.name[0]}</Avatar>
                
                <Link to="/student/perfil" color="inherit" className={s.miPerfil}>
                  {" "}
                  Mi Perfil{" "}
                </Link>
                <Typography variant="h6" color="inherit" className={s.logout}>
                  {user && <div onClick={logoutSession}>Salir</div>}
                </Typography>
              </>
            ): user.role === "instructor" ? (
              <>
                <Avatar className={s.avatar}>{user && user.name[0]}</Avatar>
                <Link to="/instructor/perfil" color="inherit">
                  {" "}
                  Mi Perfil{" "}
                </Link>
              </>
            ) : null}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
