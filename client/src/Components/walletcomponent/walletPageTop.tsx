import React from "react";

import "../../css/components/WalletPage/walletPageCenter.css";
const WalletPageTop = () => {
  return (
    <div className="WalletPage_center_section">
          <div className = 'WalletPage_center_section_sub_title'>
          <span>구독 정보</span>
      <p>xxx, 갱신이 얼마 남지 않았어요!</p>
     </div>
 
      <div className="WalletPage_center_section_sub">
        {/* <span>6/29</span> */}
        <div className="WalletPage_center_section_sub2">
          <span>6/29</span>
        </div>
        <div className="WalletPage_center_section_sub3">
          <span>6/30</span>
        </div>
        <div className="WalletPage_center_section_sub4">
          <span>9/10</span>
        </div>
      </div>
    </div>
  );
};

export default WalletPageTop;
