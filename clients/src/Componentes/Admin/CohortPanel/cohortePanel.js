import React from "react";
import Tabla from "../cohorteCRUD/logic";
import CardUsuario from "../cardUsuario/logic";
import CardFunciones from "../cardFunciones/logic";

const CohortesPanel = ({showStudents}) => {
  return (
    <div>    
      <div style={{ display: "flex" }}>
        <CardUsuario />
        <CardFunciones />
      </div>
        <Tabla showStudents={showStudents}/>  
    </div>
  );
};

export default CohortesPanel;
