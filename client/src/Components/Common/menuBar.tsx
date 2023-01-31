import React, { useEffect, useState } from "react";

import {
  Route,
  BrowserRouter,
  Link,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";


import '../../css/common/menuBar.css'

const MenuBar = () => {
  return (
    <div id="menuBar">
      <div className="menuBarSection">
        <div className="menuBarSection_top">
        <div>
          <img src='/images/2.png'></img>
       
          <div className='menuBar_line'></div>
          <span>
         로그인하세요

          </span>
          <button>로그인</button>

          </div>

          <div>
          이름,벨
          </div>
          <div>
            x표시
          </div>
      


        </div>
        <div className="menuBarSection_middle">
          <div>메인메뉴</div>
          <ul>

            <li>
              메인페이지
              
            </li>
            <li>
              구독지갑
              
              </li>
              <li>
                구독공유
              
              </li>
              <li>
                구독달력
              
              </li>
              <li>
                
              
              </li>
              <li>
              
              </li>
          </ul>


        </div>
      </div>
    </div>
  );
};
export default MenuBar;
