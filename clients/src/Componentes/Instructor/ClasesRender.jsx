import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import Navbar from "../Navbar";
import Footer from "../Footer";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

export default function ClasesRender() {
    const { user } = useSelector((state) => state.auth);
    const [links, setLinks] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        Axios.get("http://localhost:3001/clases/all").then(res => {
            setLinks(res.data[res.data.length - 1].link)
        })
    }, [])

    function handleClick(e) {
        e.preventDefault();

    }

    return (
        <div>
            <Navbar user={user}></Navbar>
            <Container>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Links
          </Typography>
                    <div className={classes.demo}>
                        <List dense={false}>
                            {links.map(e => {
                                return (<ListItem onClick={handleClick}>
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={e}
                                        secondary={false}
                                    />
                                </ListItem>)
                            })}
                        </List>
                    </div>
                </Grid>

            </Container >
            <Footer />
        </div>

    )
}