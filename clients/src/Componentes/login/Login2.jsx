import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Login2.css";
import { authLogin } from "../../redux/actions/authActions";
import { useHistory } from "react-router-dom";
import Footer from "../Footer";
import Bienvenida from "../Bienvenida";
import { Mail, Lock } from "@material-ui/icons";

export default function Login() {
  const userLogin = useSelector((store) => store.auth.user);
  console.log(userLogin, "*********************************");

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const userchange = (e) => {
    setUser(e.target.value);
  };

  const passchange = (e) => {
    setPass(e.target.value);
  };

  const enviar = async (e) => {
    e.preventDefault();
    await dispatch(authLogin(user, pass));
  };

  useEffect(() => {
    if (userLogin && userLogin.role === "admin") {
      history.push("/admin");
    }
    if (userLogin && userLogin.role === "student") {
      history.push("/alumnos");
    }
    if (userLogin && userLogin.role === "instructor") {
      history.push("/instructor");
    }
  }, [userLogin]);

  return (
    <>
    <Bienvenida />
    <div className="align">
      <div className="grid">
        <form className="form login">
          <div className="form__field">
            <label for="login__username" className="cont_label">
              <Mail />
              <span className="hidden">Usuario</span>
            </label>
            <input
              onChange={userchange}
              id="login__username"
              type="text"
              name="username"
              className="form__input"
              placeholder="Correo"
              required
            />
          </div>

          <div class="form__field">
            <label for="login__password" className="cont_label">
              <Lock />
              <span className="hidden">Contraseña</span>
            </label>
            <input
              onChange={passchange}
              id="login__password"
              type="password"
              name="password"
              className="form__input"
              placeholder="Contraseña"
              required
            />
          </div>

          <div className="form__field" onClick={enviar}>
            <input type="submit" value="Ingresar" />
          </div>

          {/* Boton Facebook  */}
          <a href="http://localhost:3001/auth/github">
            <div className="btn-alternativo" id="github" value="github">
              {/* <GitHubIcon/> */}
              <img src="https://image.flaticon.com/icons/png/512/25/25231.png" />
              <p>Continuar con GitHub</p>
            </div>
          </a>

          {/* Boton Google */}
          <a href="http://localhost:3001/auth/google">
            <div className="btn-alternativo" id="goog" value="google">
              <img src="https://cdn.icon-icons.com/icons2/673/PNG/128/Google_icon-icons.com_60497.png" />
              <p>CONTINUAR CON GOOGLE</p>
            </div>
          </a>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
}
