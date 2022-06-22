import FullMyCalendar from 'Components/Subcalendar/fullcalendarcenter';
import React ,{useState}from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'


// import '../css/pages/CalendarPage.css'

// interface callendar {
// handleDayClick = () =>void

// }
const CallendarPage:React.FC = () => {


  return(

    <div id='Calendar_Page'>
<FullMyCalendar></FullMyCalendar>
{/* <FullCalendar plugins={[dayGridPlugin]}></FullCalendar> */}
{/* <Calendar></Calendar> */}
    </div>
  )
};

export default CallendarPage;
