import React, { useState } from "react";
import { useEffect } from "react";
import s from "../styles/login.module.css";
import { useHistory } from "react-router-dom";
import Bienvenida from "./Bienvenida";
import Footer from "./Footer";
import Button from "@material-ui/core/Button";
import Fondo from "./utils/registro.jpg";
import { useDispatch } from "react-redux";
import { postStudent } from "../redux/actions/studentActions";

export default function Registro() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    dni: "",
    check: false,
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    nameError: "",
    lastnameError: "",
    dniError: "",
  });

  const inputsChange_name = (e) => {
    if (/[$%&|{}.,()+-<>#]/.test(data.name)) {
      setErrors({
        ...errors,
        nameError: "no se aceptan caracteres especiales",
      });
    } else {
      setErrors({
        ...errors,
        nameError: "",
      });
    }
    setData({
      ...data,
      name: e.target.value,
    });
  };

  const inputsChange_lastName = (e) => {
    if (/[$%&|{}.,()+-<>#]/.test(data.lastName)) {
      setErrors({
        ...errors,
        lastnameError: "no se aceptan caracteres especiales",
      });
    } else {
      setErrors({
        ...errors,
        lastnameError: "",
      });
    }
    setData({
      ...data,
      lastName: e.target.value,
    });
  };

  const inputsChange_email = (e) => {
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      setErrors({
        ...errors,
        emailError: "El email ingresado no es valido",
      });
    } else {
      setErrors({
        ...errors,
        emailError: "",
      });
    }
    setData({
      ...data,
      email: e.target.value,
    });
  };

  const inputsChange_password = (e) => {
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(data.password)) {
      setErrors({
        ...errors,
        passwordError:
          "Debe tener al menos 6 caracteres, una mayuscula, una minuscula y un numero",
      });
    } else {
      setErrors({
        ...errors,
        passwordError: "",
      });
    }
    setData({
      ...data,
      password: e.target.value,
    });
  };

  const inputsChange_dni = (e) => {
    // if (/[$%&|{}.,()+-<>#]/.test(data.dni)) {
    //   setErrors({
    //     ...errors,
    //     dniError: "no se aceptan caracteres especiales",
    //   });
    // } else {
    //   setErrors({
    //     ...errors,
    //     dniError: "",
    //   });
    // }
    setData({
      ...data,
      dni: e.target.value,
    });
  };

  useEffect(() => {
    if (
      data.name.length > 3 &&
      data.lastName.length > 3 &&
      data.check === true &&
      data.email.length > 1 &&
      !errors.emailError &&
      data.password.length > 1 &&
      !errors.passwordError &&
      !errors.lastnameError &&
      !errors.nameError
    ) {
      setErrors({
        ...errors,
        errores: false,
      });
    } else {
      setErrors({
        ...errors,
        errores: true,
      });
    }
  }, [
    data.name,
    data.lastName,
    data.email,
    data.password,
    data.check,
    errors.emailError,
    errors.passwordError,
    errors.nameError,
    errors.lastnameError,
  ]);

  const check = (e) => {
    if (e.target.checked === true) {
      setData({
        ...data,
        check: true,
      });
    } else {
      setData({
        ...data,
        check: false,
      });
    }
  };

  async function sendData(e) {
    e.preventDefault();
    console.log(data);

    await dispatch(postStudent(data));
    history.push("/login");
  }

  return (
    <div className="Login">
      <Bienvenida />

      <div className={s.container}>
        {/* <div className={s.hijo1}>
          <div className={s.text}>
            <h6>REGISTRO</h6>
            <img src={Fondo} alt="" style={{ width: "700px" }} />
          </div>
        </div> */}
        <div className={s.hijo2}>
          <div className={s.cont_titleForm}>
            <h6>Crear Usuario</h6>
          </div>
          <form className={s.sing_in}>
            <div class="form-group">
              {/* <label>Nombre</label> */}
              <input
                name="name"
                onChange={inputsChange_name}
                type="text"
                class="form-control"
                style={{ color: "black", width: "400px" }}
                placeholder="Ingresar Nombre"
              />
              <small className="detail">{errors.nameError}</small>
            </div>
            <div class="form-group">
              {/* <label>Apellido</label> */}
              <input
                name="lastName"
                onChange={inputsChange_lastName}
                type="text"
                class="form-control"
                style={{ color: "black", width: "400px" }}
                placeholder="Ingresar Apellido"
              />
              <small className="detail">{errors.lastnameError}</small>
            </div>
            <div class="form-group">
              {/* <label>Email</label> */}
              <input
                name="email"
                onChange={inputsChange_email}
                type="email"
                class="form-control"
                style={{ color: "black", width: "400px" }}
                aria-describedby="emailHelp"
                placeholder="Ingresar email"
              />
              <small id="emailHelp" class="detail">
                {errors.emailError}
              </small>
            </div>
            <div class="form-group">
              {/* <label>Password</label> */}
              <input
                name="password"
                onChange={inputsChange_password}
                type="password"
                class="form-control"
                style={{ color: "black", width: "400px" }}
                placeholder="Password"
              />
              <small className="detail">{errors.passwordError}</small>
            </div>
            <div class="form-group">
              {/* <label>Dni</label> */}
              <input
                name="dni"
                onChange={inputsChange_dni}
                type="dni"
                class="form-control"
                style={{ color: "black", width: "400px" }}
                placeholder="DNI"
              />
              <small className="detail">{errors.dniError}</small>
            </div>
            <Button type="submit" class={s.submit} onClick={sendData}>
              Registrar
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
