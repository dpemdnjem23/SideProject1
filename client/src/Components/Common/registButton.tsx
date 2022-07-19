import axios from "axios";
import React, { useEffect } from "react";

import "../../css/common/registButton.css";

axios.defaults.headers.post['Content-Type'] = 'application/json'

const RegistButton = () => {

const registSubscribe = () =>{

  axios.post(`${process.env.REACT_APP_API_URI}/wallet/subregist`,)
}




  return (
    <div onClick={registSubscribe} className="regist_bt_section">
      <span>등록하기</span>
    </div>
  );
};

export default RegistButton;
