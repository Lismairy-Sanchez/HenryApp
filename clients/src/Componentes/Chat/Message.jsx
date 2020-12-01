import React, { forwardRef } from "react"
import { Card, CardContent, Typography } from "@material-ui/core"
import "./Message.css";

const Message = forwardRef(({ message, username }, ref) => {
    const isUser = username === message.username;
    return (
        <div ref={ref} className={`message_guest ${isUser && `message_user`}`}>
            <Card className={isUser ? `message_userCard` : `message_guestCard`}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {!isUser && `${message.username}:`} {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>

    )
})

export default Message;