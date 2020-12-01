import React, { useEffect } from "react";
import View from "./view";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCohort,
  updateCohort,
} from "../../../redux/actions/cohortActions";

function Crud({ showStudents }) {
  const dispatch = useDispatch();
  const row = useSelector((state) => state.cohort.allCohort);

  const editarCohorte = (name, data) => {
    dispatch(updateCohort(name, data));
  };

  useEffect(() => {
    dispatch(getAllCohort());
  }, []);

  return (
    <div>
      <View showStudents={showStudents} data={row} edit={editarCohorte} />
    </div>
  );
}

export default Crud;
