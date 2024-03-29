import { instance } from "App";
import axios from "axios";
import React, { useEffect, useState } from "react";

import "../../css/components/WalletPage/walletPageTop.css";
const WalletPageTop = () => {
  const [walletPeriod, setWalletPeriod] = useState([]);

  const [walletImageInfo, setWalletImageInfo] = useState<{ name: string }[]>(
    []
  );
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    instance
      .get(`/wallet/toptwo`, {})
      .then((res) => {
        setWalletPeriod(res.data.data);
        setWalletImageInfo(res.data.wallet);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);


  // console.log(walletPeriod,walletImageInfo)
  //갱신기간은 어떻게? 똑같은 것끼리 top2
  //가장빠른 end_date 2개만 가져온다
  //end_date에 해당하는 구독을 표시한다. 어떻게? 몰라 일단해봐
  // end_date를 찾고
  return (
    <>
      <div className="WalletPage_Top_section_sub_title">
        {/* <p> {walletImageInfo[0].name},</p> */}
        {walletPeriod.length > 0 ? (
          <span>갱신이 얼마 남지 않았어요!</span>
        ) : null}
      </div>
      <div className="WalletPage_Top_section">
        {walletPeriod.map((el: any, index: number) => {
          return (
            <div key={index} className="WalletPage_Top_section_sub">
              <span>
                {el.end_date.substr(5, 2) +
                  "월 " +
                  el.end_date.substr(8, 2) +
                  "일"}
              </span>
              {walletImageInfo.map((el2: any, indexx) => {
                //이미지를 end_date에 맞게 분류 한다.
                if (el.end_date === el2.end_date) {
                  //   style={{position: 'absolute'

                  // style={{position: 'relative',
                  //                  right:`${indexx*5+20}px`}}

                  // }}
                  return (
                    <div key={el2.id} className="WalletPage_Top_imgsec">
                      <img
                        className={"WalletPage_Top_img" + indexx}
                        src={el2.image}
                      ></img>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}

        {/* <div className="WalletPage_Top_section_sub">
          <span>
            {walletPeriod[1].end_date.substr(5, 2) +
              "월 " +
              walletPeriod[1].end_date.substr(8, 2) +
              "일"}
          </span>
        </div> */}
      </div>
    </>
  );
};

export default WalletPageTop;
