import axios from "axios";
import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const AlarmTop = () => {
  return (
    <div className="AlarmTop">
      <div className="AlarmTop_Xbutton">
        <div>
          <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
        </div>
      </div>

      <div className="AlarmTop_contents">


          
      </div>
    </div>
  );
};

export default AlarmTop;
