import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormControl, Input } from '@material-ui/core';
import Rating from "./Rating.jsx"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from "axios";
import { useEffect } from 'react';

export default function Alert(props) {
    // estilos
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });
    const classes = useStyles();
    // variables de apertura de modal y succes snackbar
    const [open, setOpen] = useState(false);
    const [opena, setOpena] = useState(false);
    //user harcodeado, deberia venir por props desde el componente que se llama
    const [userr, setUserr] = useState('javier');
    //id harcodeado, deberia venir por props
    const [id, setId] = useState("");
    // estados de comentario, calificacion
    const [coment, setComent] = useState("");
    const [calif, setCalif] = useState(0);
    const bull = <span className={classes.bullet}>•</span>;

    useEffect(() => {
        if (props.ope) {
            handleClickOpen()
        }
        else {

        }

    }, [props.ope])

    //setea el comentario a medida que se escribe
    const handleChange = (e) => {
        e.preventDefault();
        setComent(e.target.value)
    }
    // se manda por props al componente rating que debe pasarle como parametro la calificacion
    const handleRating = (calif) => {
        setCalif(calif);
    }
    //hace el post con los datos 
    const handleSend = () => {
        if (!id && !coment && !calif) {
            alert("faltan datos")
        }
        else {
            Axios.post("http://localhost:3001/feedback/create", { idStudent: id, comment: coment, qualification: calif })
                .then(res => {
                    alert("succes!")
                    console.log(res.data)
                }).catch(err => {
                    alert("algo salio mal")
                    console.log(err);
                })
        }
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClosea = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpena(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.close();
    };

    const handleSuccess = () => {
        setOpena(true);
        setOpen(false);
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* cambiar por el que llega por props */}
                <DialogTitle> Calificar a {userr} </DialogTitle>
                <DialogContent>
                    <Rating handleRating={handleRating} />
                    <Typography className={classes.pos} color="textSecondary">
                        Quieres dejar un comentario?
                    </Typography>
                    <FormControl >
                        <Input onChange={handleChange} placeholder="deja tu comentario aqui"></Input>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
          </Button>
                    <Button onClick={handleSuccess} color="primary" autoFocus>
                        Aceptar
          </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={opena} autoHideDuration={3000} onClose={handleClosea}>
                <Alert onClose={handleClosea} severity="success">
                    Feedback enviado con exito!
                </Alert>
            </Snackbar>
        </div>
    );
}