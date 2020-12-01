import React, { useState, useEffect } from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Axios from "axios";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormControl, Input } from '@material-ui/core';
import Rating from "../pairprogramming/feedback/Rating.jsx"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import RateReviewIcon from '@material-ui/icons/RateReview';
import "./TableRoww.css"


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


export default function TableRoww(props) {
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
    const [prom, setProm] = useState(0);

    useEffect(() => {
        Axios.get(`http://localhost:3001/feedback/prom/${props.props.id}`)
            .then(res => {
                setProm(res.data.resultado)
            }).catch(err => {
                console.log(err.message)
            })
    }, [])

    useEffect(() => {

    }, [prom]);


    function handleClick(e) {
        e.preventDefault();
        setOpen(true);
    }


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
        if (!coment || !calif) {
            alert("faltan datos")
        }
        else {
            console.log(props.props.id);
            console.log(coment);
            console.log(calif);
            Axios.post("http://localhost:3001/feedback/create", { idStudent: props.props.id, comment: coment, qualification: calif })
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

    const handleClose = () => {
        console.log("closeeee")
        setOpen(false);
        console.log(open)
    };

    const handleSuccess = () => {
        handleSend()
        setOpena(true);
        setOpen(false);
    }

    return (

        <TableRow key={props.props.name} >
            <TableCell component="th" scope="row">
                {props.props.name}
            </TableCell>
            <TableCell align="left">{props.props.lastName}</TableCell>
            <TableCell align="left">{prom}</TableCell>
            <TableCell align="left"><RateReviewIcon fontSize='large' className="boton__calif" onClick={handleClick}></RateReviewIcon></TableCell>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* cambiar por el que llega por props */}
                <DialogTitle> Calificar a {props.props.name} </DialogTitle>
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

        </TableRow>


    )
}