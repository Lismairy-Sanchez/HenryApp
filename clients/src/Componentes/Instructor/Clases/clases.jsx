import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import "./clases.css"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function Clases(props) {
    const classes = useStyles();
    const [key, setKey] = useState(1);
    const [chipData, setChipData] = useState([
        { key: 0, label: '' },
    ]);
    const [clase, setClase] = useState();

    useEffect(() => {
        sendChipData(chipData)
    }, [chipData])

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const handleChange = (e) => {
        e.preventDefault();
        setClase(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setChipData([...chipData, { key: key, label: clase }])
        setKey((k) => {
            return k + 1;
        })
    }
    const sendChipData = (arr) => {
        props.recursos(arr)
    }
    return (
        <div className="chip">
            <form className="form__clases" onSubmit={handleSubmit} onChange={handleChange}>
                <div>
                    <TextField id="videos" label="Clases" />
                    <FormHelperText>ingrese el link de su clase</FormHelperText>
                </div>
                <Button variant="outlined" color="primary" type="submit">Agregar</Button>
            </form>
            <div>
                <Paper component="ul" className={classes.root}>
                    {chipData ? chipData.map((data) => {
                        if (data.key === 0) {
                            return (<div></div>)
                        }
                        return (
                            <li key={data.key}>
                                <Chip
                                    label={data.label}
                                    onDelete={handleDelete(data)}
                                    className={classes.chip}
                                />
                            </li>
                        );
                    }) : <div></div>}
                </Paper>
            </div>

        </div>
    );
}