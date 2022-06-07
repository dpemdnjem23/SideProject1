import React, { useState } from "react";

import "../../css/components/WalletPage/walletPageCenter.css";




interface showSubDetailModal {
  openSubModal: () =>void


  }
  
const WalletPageCenter:React.FC<showSubDetailModal> = ({openSubModal}) => {



  return (
    <div  className="WalletPage_center_section">
      <div   onClick={() =>openSubModal()}  className="WalletPage_center_sub_box">
        <img  src="./images/netflex.png" />
        <span>넷플릭2스</span>
        <span>1달</span>
        <span>3,5000원</span>
      </div>

      <div className="WalletPage_center_sub_box">
        <img src="./images/netflex.png" />
        <span>넷플릭스모에모에망사</span>
        <span>1달</span>
        <span>3,500원</span>
      </div>
      <div className="WalletPage_center_sub_box">
        <img src="./images/netflex.png" />
        <span>넷플릭스</span>
        <span>1달</span>
        <span>3,500000원</span>
      </div>
      <div className="WalletPage_center_sub_box">
        <img width="30" src="./images/netflex.png" />
        <span>넷플릭스</span>
        <span>1달</span>
        <span>3,500원</span>
      </div>
      <div className="WalletPage_center_sub_box">
        <img width="30" src="./images/netflex.png" />
        <span>넷플릭스</span>
        <span>1달</span>
        <span>3,500원</span>
      </div>
      <div className="WalletPage_top_sub_box">
        <img width="30" src="./images/netflex.png" />
        <span>넷플릭스</span>
        <span>1달</span>
        <span>3,500원</span>
      </div>
      <div className="WalletPage_top_sub_box">
        <img width="30" src="./images/netflex.png" />
        <span>넷플릭스</span>
        <span>1달</span>
        <span>3,500원</span>
      </div>
      <div className="WalletPage_center_sub_box">
        <img width="30" src="./images/netflex.png" />
        <span>넷플릭스</span>
        <span>1달</span>
        <span>3,500원</span>
      </div>
      <div className="WalletPage_center_sub_box">
        <img width="30" src="./images/netflex.png" />
        <span>넷플릭스</span>
        <span>1달</span>
        <span>3,500원</span>
      </div>
      <div className="WalletPage_center_sub_box">
        <img width="30" src="./images/netflex.png" />
        <span>넷플릭스</span>
        <span>1달</span>
        <span>3,500원</span>
      </div>
    </div>
  );
};

export default WalletPageCenter;
