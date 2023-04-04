import React, { useState, useEffect } from "react";
import axios from "axios";
// import { accessToken } from 'utils/state'

import moment from "moment";
type walletPageBottom = {

  walletSubCost:number
}

import "../../css/components/WalletPage/walletPagebottom.css";
import { instance } from "App";
const WalletPageBottom:React.FC<walletPageBottom> = ({walletSubCost}) => {



  const [walletPayment,setWalletPayment ] =useState<number>(0)
  
// const {} = walletPageCostState()

const accessToken:string|null = localStorage.getItem("accessToken");


useEffect(()=>{

  instance
.get(`${process.env.REACT_APP_API_URI}/wallet/payment`, {
  headers: {
    'Content-Type':'application/json',
    authorization: `Bearer ${accessToken}`,
  },
})
.then((res) => {
  const costSum = res.data.data.map((pre: { cost: number }) => {
    return pre.cost;
  });

  let sum = 0;

  for (let i = 0; i < costSum.length; i++) {
    sum = sum + costSum[i];
  }
// setWalletSubCost(sum)
  setWalletPayment(sum);
})
.catch((err) => {
  console.log(err);
});

},[])


  //총 구독 가격은 현재 올라와있는 구독의 가격
  //총 결제 금액은 충 구독 가격에다가 현재 결제가남은 그액
  // 결제일이 end_date인데 end_date에 도달하지 못한 경우
  //9월 10 월 11월
  //

  //결제금액  -> 얼만큼 결제함? 총 구독금액에서 결제한 만큼 start_date에 도달하면 결제한것

  return (
    <div className="WalletPage_Bottom_section">
      <span> 총 구독가격 &nbsp;</span>
      <span className="WallPage_Bottom_section_price">
        {walletSubCost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
      </span>
      <span>&nbsp; 원 &nbsp; </span>
      <span>총 결제금액&nbsp;</span>
      <span className="WallPage_Bottom_section_price2">{walletPayment.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span>
      &nbsp;원
    </div>
  );
};

export default WalletPageBottom;
