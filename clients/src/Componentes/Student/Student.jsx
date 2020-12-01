import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import {logoutUser} from '..Redux/u';
// import "./Components/app.css";
// import img1 from "./img/pexels-photo-392018.jpeg"
// import {Carousel} from 'react-bootstrap';
import "./Student.css";
import img2 from "../utils/imghomeworks.jpg";
import img3 from "../utils/calendar.jpeg";
import img4 from "../utils/class.jpeg";
import pairp from "../utils/pairp.jpg";
import coding from "../utils/coding.jpg";
import meeting from "../utils/meeting.jpg";
import calif from "../utils/calif.jpg";
//  import "./prueba.css"
import Footer from "../../Componentes/Footer.jsx";
import Carrusel from "../Carrusel.jsx";
import Stepper from "../../Componentes/Stepper/Stepper";
import Navbar from "../Navbar";
import BotonChat from "../Chat/BotonChat";
import { verifySession } from "../../redux/actions/authActions";

const Student = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifySession());
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div class="root">
        <Carrusel />
        <div className="container">
          <Stepper />
        </div>
        <div className="algo">
          <div className="conten_taks">
            <div class="category-box">
              <img key={img3} src={img3} alt="" />
              <div class="content">
                <div>
                  <h2>Calendario</h2>
                  <div className="boton_link">
                    <Link className="link" to="/calendario">
                      Ingresar
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div class="category-box">
              <img key={img4} src={img4} alt="" />
              <div class="content">
                <div>
                  <h2>Acceso a clase</h2>
                  <div className="boton_link">
                    <Link className="link" to="/claseslink">Ingresar</Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="category-box">
              <img key={img2} src={img2} alt="" />
              <div class="content">
                <div>
                  <h2>Homeworks</h2>
                  <div className="boton_link">
                    <Link className="link" to="https://github.com/">Ingresar</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="conten_taks">
            <div class="category-box">
              <img key={coding} src={coding} alt="" />
              <div class="content">
                <div>
                  <h2>Clases grabadas</h2>
                  <div className="boton_link">
                    <Link className="link" to="/clases">
                      Ingresar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="category-box">
              <img key={meeting} src={meeting} alt="" />
              <div class="content">
                <div>
                  <h2>Stand Up</h2>
                  <div className="boton_link">
                    <Link className="link">Ingresar</Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="category-box">
              <img key={pairp} src={pairp} alt="" />
              <div class="content">
                <div>
                  <h2>Pair Programming</h2>
                  <div className="boton_link">
                    <Link className="link">Ingresar</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div style={{ marginLeft: "50px"}} >   */}
          <div className="conten_taks">
            <div class="category-box">
              <img key={calif} src={calif} alt="" />
              <div class="content">
                <div>
                  <h2>Calificaciones</h2>
                  <div className="boton_link">
                    <Link className="link">Ingresar</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BotonChat />
      </div>

      <Footer />
    </>
  );
};

export default Student;