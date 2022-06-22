import React from "react";

import { Link,Outlet } from "react-router-dom";
import "../../css/common/mainHeaderLogo.css";
const MainHeaderLogo = () => {
  return (
      <>
    <div id="headerLogo">
      
      <div className="logo">
   
        <div>
          <Link to="/">
            <img width="60" src="./images/2.png" />
          </Link>
        </div>
       
      </div>
      
    

    </div>
    <Outlet></Outlet>
    </>

  );
};

export default MainHeaderLogo;
