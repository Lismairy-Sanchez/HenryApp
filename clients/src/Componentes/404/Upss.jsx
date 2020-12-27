import React from "react";
import anime from "animejs/lib/anime.es.js";
import "./Upss.css";

const Upss = () => {
  return (
    <>
      <div className="bodyError">
        <div className="header2">
          <div class="luna"></div>
          <h2>Upss...</h2>
        </div>

        <div className="main2">
          <div id="nubes"></div>
          <div class="estrella1"></div>
          <div class="estrella2"></div>
          <div class="estrella3"></div>
          <div id="cohete">
            <img
              src="https://i.imgur.com/CEzmszV.png"
              alt="cohete"
              id="img_cohete"
            />
          </div>
          <h1 className="error">Error 404!</h1>
        </div>

        <footer className="footer2">
          <p>Deja el ratón sobre el cohete para despegar</p>
        </footer>
      </div>
    </>
  );
};

export default Upss;