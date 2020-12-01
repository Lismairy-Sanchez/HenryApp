import React from 'react';
import s from '../styles/bienvenida.module.css';
import {AppBar, Toolbar, Typography, Link, Avatar }from '@material-ui/core';
import logo from '../Componentes/utils/LogoHenry.png'




const Bienvenida = ()=>{
    return(
        <div>
            <AppBar position="static" className={s.menu2}>            
                <Toolbar variant="dense" className={s.cont_nav2}>
                <Link href="/"><img src={logo}/></Link>              
                <Typography variant="h6" color="inherit" className={s.link2}>
                    Bienvenido
                </Typography>
                </Toolbar>
            </AppBar>
        </div>
        
    )
}

export default Bienvenida