import React from "react";
import { useNavigate } from "react-router-dom";
import { registSubInfoState,cycleState,dateState } from "utils/state";
import moment from "moment";

import "../../css/common/cancellationButton.css";

const CancellationButton = () => {
  const navigate = useNavigate();


  const backToMypage= () =>{

    
  
navigate('/mypage')
    
  }
  return (
    <div onClick ={backToMypage} className="cancellation_bt_section">
      <span>취소하기 X</span>
    </div>
  );
};

export default CancellationButton;
