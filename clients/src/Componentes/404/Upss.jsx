import React from "react";
import anime from "animejs/lib/anime.es.js";
import "./Upss.css";

const Upss = () => {
  return (
    <>
      <div className="body">
        <div className="header">
          <div class="luna"></div>
          <h1>Upss...</h1>
        </div>

        <div className="main">
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
            <h1>Error 404!</h1>
          </div>
        </div>

        <footer>
          <p>Deja el ratón sobre el cohete para despegar</p>
        </footer>
      </div>
    </>
  );
};

export default Upss;
