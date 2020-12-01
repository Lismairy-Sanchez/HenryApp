import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Add from './modalAdd'

const useStyles = makeStyles({
    root: {
      width: "45%",
      margin:"10px auto"
    },
    media: {
      height: 140,
    },
  });



const ViewCardUsuario =()=>{
    const classes = useStyles();
    return (
        <Card className={classes.root}>
      <CardActionArea>
      
        
      </CardActionArea>
      <CardActions>
      <Add/>
          
        
        
      </CardActions>
    </Card>
    )
}

export default ViewCardUsuario