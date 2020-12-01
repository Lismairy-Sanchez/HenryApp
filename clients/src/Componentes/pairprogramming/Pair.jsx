import React from "react";
import Tabla from "./TablaAlumnos";
import Container from '@material-ui/core/Container';

export default function Pair() {
    // var id = useSelector(store => store.auth.user.user.PP)

    var alumnos = [{ name: "ale", lastName: "zdut", id: "5fbbc821615d6f2bbc977ec1" }]
    return (
        <Container fixed>
            <Tabla alumnos={alumnos} />
        </Container>
    )
}