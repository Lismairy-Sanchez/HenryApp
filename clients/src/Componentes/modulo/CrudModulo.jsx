import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import "./CrudModulo.css"
import Axios from "axios";



export default function CrudModulo() {
    const [modulos, setModulos] = useState([])

    useEffect(() => {
        Axios.get("http://localhost:3001/module/all").then(res => {
            console.log(res.data.modules)
            setModulos(res.data.modules)
            console.log(modulos)
        })
    }, [])


    return (
        <Container fixed>
            <div className="contenedor">
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
                <h3 className="titulo">MODULOS</h3>
                <List className="lista" aria-label="mailbox folders">
                    {modulos.length > 0 ? modulos.map(e => {
                        return (<div>
                            <ListItem button>
                                <p>{e.name}</p>
                            </ListItem>
                            <Divider />
                        </div>)
                    }) : <p>no hay modulos cargados</p>}
                </List>
            </div>
        </Container>
    )
}