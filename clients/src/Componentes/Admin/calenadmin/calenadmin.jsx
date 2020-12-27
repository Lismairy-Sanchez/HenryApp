import { React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from "react-redux";
import { postCalendar } from "../../../redux/actions/calendarActions";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function DateAndTimePickers() {
  const [listener, setListener] = useState(false)
  const [textFieldValue, setTextFieldValue] = useState('');
  const [dateFieldValue, setDateFieldValue] = useState('');
  const [endFieldValue, setEndFieldValue] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
  
  

  function handleDateFieldChange(e) {
    setDateFieldValue(
        e.target.value
    )
}

function handleEndDateFieldChange(e) {
  setEndFieldValue(
    e.target.value
  )
}

  function handleTitleFieldChange(e) {
    setTextFieldValue(
      e.target.value
    )
  }

  function handleSubmit(){
    setListener(true)
  }

 /*  title, year, month, day, hour, minute, endYear, 
      endMonth, endDay, endHour, endMinute, allDay */
  
    useEffect(() => {
      if(listener===true && textFieldValue && dateFieldValue && endFieldValue){
        const AMZ = dateFieldValue.split('-')
        const DFullH = AMZ[2].split('T')
        const HM = DFullH[1].split(':')
        const primero = endFieldValue.split('-')
        const segundo = primero[2].split('T')
        const tercero = segundo[1].split(':')
        const event = {
          title:textFieldValue,
          year:AMZ[0],
          month:AMZ[1],
          day:DFullH[0],
          hour:HM[0],
          minute:HM[1],
          endYear:primero[0],
          endMonth:primero[1],
          endDay:segundo[0],
          endHour:tercero[0],
          endMinute:tercero[1],
          allDay:false
          }       
        dispatch(postCalendar(event));
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Evento Creado!`,
          showConfirmButton: true         
        })
        .then(()=>{
          setListener(false)
          setTextFieldValue('')
          setDateFieldValue('')
          setEndFieldValue('')
        })
        
      }
      
    }, [handleSubmit]);
  

  return (
    <div>
    <form className={classes.container} noValidate>
     
      <TextField
        id="datetime-local"
        label="Event Start"
        type="datetime-local"
        /* defaultValue="2017-05-24T10:30" */
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={dateFieldValue} 
        onChange={handleDateFieldChange}
      />
    </form>

    <form className={classes.container} noValidate>
     
      <TextField
        id="datetime-local"
        label="Event End"
        type="datetime-local"
        /* defaultValue="2017-05-24T10:30" */
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={endFieldValue} 
        onChange={handleEndDateFieldChange}
      />
    </form>


     <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Title" variant="outlined" value={textFieldValue} 
        onChange={handleTitleFieldChange} />
    </form>
    <button onClick={handleSubmit}>Submit</button>

   <div><br></br></div>
   
    <div>
      <div className="boton_link">
          <Link className="link" to="/calendario">
            <button >Ver Calendario</button>
            </Link>
            </div>
      </div>

    </div>
  );
} //
