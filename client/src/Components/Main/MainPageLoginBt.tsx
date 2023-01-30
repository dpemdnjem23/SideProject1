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
  const { footerLoginBt, zoomIn, zoomOut } =
    MainPageUseStore();  // io.observe(button);

  const FadeOutButton = zoomOut ? "zoom-out" : "";
  const FadeInButton = zoomIn ? "" : "zoom-in";
  // const StandBy = visible ? "stand" : "";
  const footer = footerLoginBt ? "" : "footer";



  return (
    <>
      {/* {visible?null: */}
      <div
        className={`MainPageLoginBt ${FadeInButton} ${FadeOutButton} ${footer}`}
      >
        <Link to="/login">
          <FontAwesomeIcon icon={faSnowflake} /> 섭개더 시작하기
        </Link>
      </div>

      {/* } */}
    </>

  );
};

export default MainPageLoginBt;
