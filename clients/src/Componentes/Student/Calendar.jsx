/* import event from "./eventos" */
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
/* import './style.css'; */
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllEvents } from "../../redux/actions/calendarActions";

const localizer = momentLocalizer(moment);

function Calendario(props) {
  const allTheEvents = useSelector((store) => store.calendar.allEvents);
  console.log("eventos aqui--->", allTheEvents);
  const events = {
    name: "React",
    allTheEvents,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  return (
    <div>
      <p>Henry Bootcamp events</p>
      <div style={{ height: "500pt" }}>
        <Calendar
          events={events.allTheEvents}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          localizer={localizer}
        />
      </div>
    </div>
  );
}

export default Calendario;
