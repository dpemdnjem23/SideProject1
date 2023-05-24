import React, { useState, useEffect } from "react";
import axios from "axios";
import { accessToken, useWalletStore } from "utils/state";
import "../../css/components/WalletPage/walletPageCenter.css";
import { instance } from "App";

type walletPageCenter = {
  openSubModal: (el: number, id: number) => void;
};

const WalletPageCenter: React.FC<walletPageCenter> = ({ openSubModal }) => {
  const { walletInfo } = useWalletStore();

  // useEffect(()[=>{

  //   instance.delete(/)
  // }])

  // console.log(walletInfo)
  return (
    <div className="WalletPage_center_section">
      {walletInfo.map((el, index) => {
        return (
          <div
            key={el.id}
            onClick={() => openSubModal(index, el.id)}
            className="WalletPage_center_sub_box"
          >
            <img src={el.image} />
            <div>{el.name}</div>
            <div>
              <span>{el.cycleYear ? el.cycleYear + "년" : ""}</span>
              <span>&nbsp;{el.cycleMonth ? el.cycleMonth + "달" : ""}</span>
              <span>&nbsp;{el.cycleDay ? el.cycleDay + "일" : ""}</span>
            </div>

            <div>
              {el.cost
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
              원
            </div>
            <div>{el.end_date}</div>

          </div>
        );
      })}
    </div>
  );
};

export default WalletPageCenter;
