import React from "react";

import { Link } from "react-router-dom";
import "../../css/common/mainHeaderLogo.css";
const MainHeaderLogo = () => {
  return (
    <div className="headerLogo">
      <div className="logo">
        <div>
          <Link to="/">
            <img width="60" src="./images/2.png" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainHeaderLogo;
