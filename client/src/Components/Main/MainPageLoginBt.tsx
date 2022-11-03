import React, { useState, useEffect } from "react";
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
const MainPageLoginBt = () => {

  // io.observe(button)

  // io.observe(button);
  return (
    <div className="MainPageLoginBt">
      <Link to="/login">
        <FontAwesomeIcon icon={faSnowflake} /> 섭개더 시작하기
      </Link>
    </div>
  );
};

export default MainPageLoginBt;
