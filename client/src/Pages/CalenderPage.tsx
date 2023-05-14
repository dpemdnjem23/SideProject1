import FullMyCalendar from "Components/Subcalendar/fullcalendarcenter";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import '../css/pages/CalendarPage.css'

// import '../css/pages/CalendarPage.css'

// interface callendar {
// handleDayClick = () =>void

// }
const CalendarPage: React.FC = () => {
  //캘린더 페이지에 진입하려고한다
  //캘린더 페이지는 토큰이 없으면 진입할수 없다.

  return (
    <div id="Calendar_Page">
      <FullMyCalendar></FullMyCalendar>
      {/* <FullCalendar plugins={[dayGridPlugin]}></FullCalendar> */}

    </div>
  );
};

export default CalendarPage;
