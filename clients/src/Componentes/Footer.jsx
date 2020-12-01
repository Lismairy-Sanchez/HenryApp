import React from 'react';
import s from '../styles/footer.module.css';
import {Link }from '@material-ui/core';
import logo from '../Componentes/utils/LogoHenry.png';
import {Facebook, Twitter, LinkedIn } from "@material-ui/icons";





const Bienvenida = ()=>{
    return(
        <div className={s.footer}>
            <Link href="/"><img src={logo}/></Link>
            <div className={s.text}>
            <h1>Hecho con 💛 por alumnos de Henry.</h1>
            <h1>Henry © 2020 | Todos los derechos reservados.</h1>
            </div>
            <div className={s.icons}>
            <Facebook className={s.editar}/>
            <Twitter className={s.editar}/>
            <LinkedIn className={s.editar}/>
            </div>
            
           
        </div>
        
    )
}

export default Bienvenida