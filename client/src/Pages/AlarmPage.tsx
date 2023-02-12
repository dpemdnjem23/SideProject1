import AlarmMain from "Components/Alarm/alarmMain";
import AlarmTop from "Components/Alarm/alarmTop";
import React, { useState, useEffect } from "react";

import "../css/pages/AlarmPage.css";
const AlarmPage = () => {
  const [pageScroll, setPageScroll] = useState<boolean>(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:768px)");

    const listener = (e: MediaQueryListEvent) => {
      setPageScroll(e.matches);
    };

    mediaQuery.addEventListener("change", listener);
    
    if (pageScroll) {
      document.body.style.overflowY = "scroll";
      document.body.style.top = "0";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflowY = "";
      document.body.style.top = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  return (
    <div id="AlarmPage">
      <AlarmTop></AlarmTop>
      <AlarmMain></AlarmMain>
    </div>
  );
};
export default AlarmPage;
