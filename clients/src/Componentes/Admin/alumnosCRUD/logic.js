import React from "react";
import View from "./view";

const columns = [
  { field: "name", headerName: "Nombre", width: 130 },
  { field: "lastName", headerName: "Apellido", width: 130 },
  { field: "dni", headerName: "DNI", width: 130 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "cohorte", headerName: "Cohorte", width: 130 },
];

const rows = [
  { id: 1, lastName: "Snow", name: "Jon", age: 35, dni: 40890890 },
  { id: 2, lastName: "Lannister", name: "Cersei", age: 42, DNI: 40890890 },
  { id: 3, lastName: "Lannister", name: "Jaime", age: 45, DNI: 40890890 },
  { id: 4, lastName: "Stark", name: "Arya", age: 16, DNI: 40890890 },
  { id: 5, lastName: "Targaryen", name: "Daenerys", age: null, DNI: 40890890 },
  { id: 6, lastName: "Melisandre", name: "pancho", age: 150, DNI: 40890890 },
  { id: 7, lastName: "Clifford", name: "Ferrara", age: 44, DNI: 40890890 },
  { id: 8, lastName: "Frances", name: "Rossini", age: 36, DNI: 40890890 },
  { id: 9, lastName: "Roxie", name: "Harvey", age: 65, DNI: 40890890 },
];

export default function DataTable({ cohort }) {
  return <View columns={columns} rows={rows} cohort={cohort} />;
}
