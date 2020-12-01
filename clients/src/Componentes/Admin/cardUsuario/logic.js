import React from "react";
import View from "./view";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function MediaCard() {
  const [perfil, setPerfil] = useState({
    name: "",
    lastName: "",
    Email: "",
  });

  const user = useSelector((store) => store.auth.user);
  // console.log(user, "user");

  // const getAdmin = ()=>{
  //   axios.get('http://localhost:3001/admin/all')
  //   .then((res)=>{
  //     setPerfil({
  //       name:res.data[0].name,
  //       lastName:res.data[0].lastName,
  //       email:res.data[0].email
  //     })
  //   })
  // }

  useEffect(() => {
    // getAdmin()
  }, []);

  return <View perfil={perfil} />;
}
