import React, { useEffect, useState } from "react";
import { Button, InputLabel, Input, FormControl } from "@material-ui/core"
import yellow from '@material-ui/core/colors/yellow';
import Message from "./Message.jsx"
import "./ChatApp.css"
import db from "../../firebase.js";
import firebase from "firebase";
import FlipMove from "react-flip-move";

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: yellow[200],
        },
        secondary: {
            main: '#f44336',
        },
    },
});

export default function ChatApp() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([{ username: '', message: '' }]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        db.collection('messages')
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
            })
    }, [])

    useEffect(() => {
        setUsername(prompt("por favor ingresa tu nombre"))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("messages").add({
            message: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    }

    return (
        <div className="todo__chat">
            <FlipMove>
                {
                    messages.map(({ id, message }) => {
                        return <Message key={id} username={username} message={message}></Message>

                    })
                }
            </FlipMove>
            <form className="form__chat">
                <FormControl className="form__control">
                    <InputLabel >Envia un mensaje..</InputLabel>
                    <Input className="input__form" value={input} onChange={e => { setInput(e.target.value) }} />
                    <Button className="boton__form" disabled={!input} variant="contained" color="contained" type="submit" onClick={sendMessage}>Enviar</Button>
                </FormControl>
            </form>
        </div >
    )
}