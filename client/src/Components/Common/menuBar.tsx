import React, { useEffect, useState } from "react";

import {
  Route,
  BrowserRouter,
  Link,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";

const MenuBar = () => {
  return (
    <div id="menuBar">
      <div className="menuBarSection">
        <div className="menuBarSection_top">
          <div>
            x표시
          </div>
          <div>
            로그인
          </div>



        </div>
        <div className="menuBarSection_middle">
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
