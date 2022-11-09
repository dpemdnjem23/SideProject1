import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Route,
  BrowserRouter,
  Link,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";
import "../../css/components/MainPage/MainPageLoginBt.css";
import { faSnowflake } from "@fortawesome/free-regular-svg-icons";
import { MainPageUseStore } from "utils/state";
const MainPageLoginBt = () => {
  const {visible,setVisible} =MainPageUseStore()
  // io.observe(button);

  const FadeButton = visible? '':'zoom-in'
  return (
    <>
    {visible?null:
    <div  className={`MainPageLoginBt ${FadeButton}`}>
      <Link to="/login">
        <FontAwesomeIcon icon={faSnowflake} /> 섭개더 시작하기
      </Link>
    </div>
    
    }
    </>
  );
};

export default MainPageLoginBt;
