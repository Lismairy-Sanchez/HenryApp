import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import foto from "../../utils/Home.jpg";

const useStyles = makeStyles({
  root: {
    width: "45%",
    margin: "10px auto",
  },
  media: {
    height: 140,
  },
});

const ViewCardUsuario = (props) => {
  const classes = useStyles();
  const { perfil } = props;
  // console.log(perfil)
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={foto}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {perfil.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {perfil.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {perfil.email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ViewCardUsuario;
