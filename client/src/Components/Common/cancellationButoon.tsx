import React from "react";
import { useNavigate } from "react-router-dom";
import { registSubInfoState, cycleState, dateState } from "utils/state";
import moment from "moment";

import "../../css/common/cancellationButton.css";
import path from "path/posix";

const CancellationButton = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const backToMypage = () => {
    if (pathname === "/shareedit") {
      navigate("/share");
    } else {
      navigate("/mypage");
    }
  };

  return (
    <div onClick={backToMypage} className="cancellation_bt_section">
      <span>취소하기 X</span>
    </div>
  );
};

export default CancellationButton;
