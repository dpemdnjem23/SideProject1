import React from "react";

import "../../css/components/MyPage/mypageuser.css";
const Mypageuser = () => {
  return (
      <div className="Mypage_user">
        <img className="Mypage_user_img" src="./images/wallet-6551548.svg" />
        <div className="Mypage_user_top"></div>
        <span className="Mypage_user_text">오징어게임</span>
        <span className="Mypage_user_text">구독 현황:15</span>
      </div>
    
  );
};
export default Mypageuser;
