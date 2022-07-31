import React, { useState, useEffect } from "react";
import axios from "axios";
import { accessToken } from "utils/state";
import "../../css/components/WalletPage/walletPageCenter.css";

interface showSubDetailModal {
  openSubModal: () => void;
  walletInfo: {
    id: number;

    name: string;
    cycle: string;
    cost: number;
    image: string;
    end_date?: string;
    start_date?: string;
    user_id?: number;
  };
}

const WalletPageCenter: React.FC<showSubDetailModal> = ({
  openSubModal,
  walletInfo,
}) => {



  return (
    <div className="WalletPage_center_section">
      {walletInfo.map((el:any)=>{
        console.log(el)
    return  <div key={el.id} onClick={() => openSubModal()} className="WalletPage_center_sub_box">
        
    
        <img src={el.image} />
        <span>{el.name}</span>
        <span>{el.cycle}</span>
        <span>{el.cost}</span>
      </div>
        })}

        </div>
  );
};

export default WalletPageCenter;
