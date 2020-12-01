import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import ChatApp from "./ChatApp.jsx"
import './PopOver.css'

export default function PopOver() {
    return (
        <PopupState style={"height: 600px"} variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <button className="boton__chat" {...bindTrigger(popupState)}>
                        Chat
                    </button>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <Box p={2}>
                            <ChatApp />
                        </Box>
                    </Popover>
                </div>
            )}
        </PopupState>
    );
}