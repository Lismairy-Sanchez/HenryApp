import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import toast from "../alerts/toast";
import { useSelector, useDispatch } from "react-redux";
import { verifySession } from "../../redux/actions/authActions";
const ProtectedAdminRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    dispatch(verifySession());
  }, []);
  if (user) {
    return (
      <Route
        {...rest}
        render={(props) => {
          if (user.role === "admin") {
            return <Component user={user} />;
          } else {
            toast.fire({
              icon: "error",
              title: `Error: Debes iniciar sesion como administrador`,
            });
            return <Redirect to={`/login`} />;
          }
        }}
      />
    );
  } else {
    toast.fire({
      icon: "error",
      title: `Error: Debes iniciar sesion`,
    });
    return <Redirect to={`/login`} />;
  }
};

export default ProtectedAdminRoute;
