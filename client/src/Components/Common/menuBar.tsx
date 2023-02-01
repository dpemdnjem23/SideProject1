import React, { useEffect, useState } from "react";

import {
  Route,
  BrowserRouter,
  Link,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "../../css/common/menuBar.css";
import XButton from "./XButton";

const MenuBar = () => {
  return (
    <div id="menuBar">
      <div className="menuBarSection">
        <div className='menuBar_Xbutton'>
          <div>x</div>
        </div>
        <div className="menuBarSection_top">
          <img className="menuBarimg" src="/images/2.png"></img>
          <span> 섭개더</span>
          {/* <div>이름,벨</div>
          < */}
        </div>

        <div className="menuBarSection_middle">
          <div>
            <Link to="/login"> 로그인</Link>
          </div>
        </div>

        <div className="menuBarSection_down">
          <div className="menuBarSection_down_main">메인메뉴</div>
          <ul className="menuBarSection_main">
            <li>
            <div>

              <span>메인페이지</span>

            
              <FontAwesomeIcon className='right_angle' icon={faChevronRight}></FontAwesomeIcon>
              </div>
 
            </li>
            <li>
              <div>

              <span>구독지갑</span>

              <FontAwesomeIcon className='right_angle'  icon={faChevronRight}></FontAwesomeIcon>
              </div>

            </li>
            <li>
            <div>

              <span>구독공유</span>

              <FontAwesomeIcon className='right_angle' icon={faChevronRight}></FontAwesomeIcon>
              </div>

            </li>
            <li>
              <div>

              <span>구독달력</span>

              <FontAwesomeIcon className='right_angle' icon={faChevronRight}></FontAwesomeIcon>
              </div>
            </li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default MenuBar;
