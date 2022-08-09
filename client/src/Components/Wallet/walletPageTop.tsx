import React from "react";

import "../../css/components/WalletPage/walletPageTop.css";
const WalletPageTop = () => {


  //갱신기간은 어떻게?
  return (

    <>
    <div className="WalletPage_Top_section_sub_title">
    <p>xxx, 갱신이 얼마 남지 않았어요!</p>
  </div>
    <div className="WalletPage_Top_section">
 

      {/* <span>6/29</span> */}
      <div className="WalletPage_Top_section_sub">
        <span>6월 29일</span>
      </div>
   
      <div className="WalletPage_Top_section_sub">
        <span>7월 9일</span>
      </div> 
    </div>
    </>
  );
};

export default WalletPageTop;
