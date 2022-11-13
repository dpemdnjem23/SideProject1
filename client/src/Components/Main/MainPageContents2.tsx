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

import "../../css/components/MainPage/MainPageContents2.css";
const MainPageContents2 = () => {


  
  return (
    <div className="MainPageContents2">
      <div className="MainPageContents2_section">
        <div className="MainPageContents2_section_text">
          <p className="MainPageContents2_section_text_category">
            SUBSCRIPTION
          </p>
          <h2 className="MainPageContents2_section_text_title">
            보다 편하게 관리<br></br>구독관리
          </h2>
          <p className="MainPageContents2_section_text_contents MainPageContents">
            사용하고 있는 구독명을 선택하고, <br></br> 기간, 가격을 입력하고
            등록해주세요
          </p>
        </div>
        <div className="MainPageContents2_section_image"></div>
      </div>
    </div>
  );
};

export default MainPageContents2;
