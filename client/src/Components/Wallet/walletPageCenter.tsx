import React, { useState, useEffect } from "react";
import axios from "axios";
import { accessToken } from "utils/state";
import "../../css/components/WalletPage/walletPageCenter.css";

type walletPageCenter = {
  openSubModal: () => void;
  walletInfo: walletInfo[];
};

type walletInfo = {
  id: string;

  name: string;
  cycleDay: string;
  cycleYear: string;
  cycleMonth: string;
  cost: number;
  image: string;
  end_date?: string;
  start_date?: string;
  user_id?: number;
};

const WalletPageCenter: React.FC<walletPageCenter> = ({
  openSubModal,
  walletInfo,
}) => {
  return (
    <div className="WalletPage_center_section">
      {walletInfo.map((el) => {
        
        return (
          <div
            key={el.id}
            onClick={() => openSubModal()}
            className="WalletPage_center_sub_box"
          >
            <img src={el.image} />
            <div>{el.name}</div>
            <div>
            <span>{el.cycleYear ? el.cycleYear + "년" : ""}</span>
            <span>&nbsp;{ el.cycleMonth ? el.cycleMonth + "달" : ""}</span>
            <span>&nbsp;{el.cycleDay ? el.cycleDay + "일" : ""}</span>
            </div>
          
            <div>{el.cost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} 원</div>
            <div>{el.end_date}</div>
          </div>
        );
      })}
    </div>
  );
};

export default WalletPageCenter;
