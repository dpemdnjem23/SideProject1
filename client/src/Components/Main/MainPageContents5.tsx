import React, { useState, useEffect } from "react";
// import
import {
  Route,
  BrowserRouter,
  Link,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";

import "../../css/components/MainPage/MainPageContents5.css";

const MainPageContents5 = () => {
  return (
    <div className="MainPageContents5">
      <div className="MainPageContents5_section">
        <div className="arrow_box">한번봐</div>
        <h1 className="MainPageContents5_text">
          <span className="MainPageContents5_text_1">쉽게 </span>
          <span className="MainPageContents5_text_2">확인하고, </span>
          <span className="MainPageContents5_text_1">더 </span>
          <span className="MainPageContents5_text_2">다양해진</span>
          <div className="MainPageContents5_text_1">구독을 관리해보세요</div>
        </h1>
      </div>
    </div>
  );
};

export default MainPageContents5;
