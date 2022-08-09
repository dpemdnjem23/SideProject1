import WalletPageBottom from "Components/Wallet/walletPageBottom";
import WalletPageCenter from "Components/Wallet/walletPageCenter";
import WalletPageTop from "Components/Wallet/walletPageTop";
import SubDetailModal from "Components/Modal/subDetailModal";
import React, { useState,useEffect, ReactNode } from "react";
import axios from 'axios'
import { accessToken, walletPageCostState } from "utils/state";

import { BrowserRouter, Route, Routes } from "react-router-dom";



// interface walletInfo {
//     id?:number,
  

//     name:string,
//     cycle:string,
//     cost:number,
//     image:string,
//     end_date?:string,
//     start_date?:string,
//     user_id?:number
  
  
// }

import "../css/pages/WalletPage.css";

const WalletPage = () => {
  const [showSubDetail, setShowSubDetail] = useState<boolean>(false);
  // const [userEdit, setUserEdit] = useState<boolean>(false);

  const [showCancellation, setShowCancellation] = useState<boolean>(false);
  const [showSubEdit, setShowSubEdit] = useState<boolean>(false);
  const [showRegist, setShowRegist] = useState<boolean>(false);

  const{setWalletSubCost,setWalletPayment} =walletPageCostState()
  const [walletInfo , setWalletInfo] = useState([])

  const accessToken:string|null = localStorage.getItem("accessToken");

  const openSubModal = () => {
    setShowSubDetail(true);
  };

  const closeSubModal = () => {
    setShowSubEdit(false);
    setShowSubDetail(false);
    setShowCancellation(false);
  };

  const openCancellationModal = () => {
    setShowCancellation(true);
  };
  const closeCancellationModal = () => {
    setShowCancellation(false);
  };
  const openSubDetailEditModal = () => {
    setShowSubEdit(true);
  };
  const closeSubDetailEditModal = () => {
    setShowSubEdit(false);
  };

  useEffect(()=>{

    axios.get(`${process.env.REACT_APP_API_URI}/wallet/walletinfo`,{
      headers:{
        'authorization':`Bearer ${accessToken}`
      }
    })
    .then((res)=>{


    setWalletInfo(res.data.data)
    })
    .catch((err)=>{
      console.log(err)

    })

    axios
    .get(`${process.env.REACT_APP_API_URI}/wallet/walletinfo`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {


      let sum = 0;

      const costSum = res.data.data.map((pre: { cost: number }) => {
        return pre.cost;
      });


      for (let i = 0; i < costSum.length; i++) {
        sum = sum + costSum[i];
      }

      console.log(sum)
      setWalletSubCost(sum);
    })
    .catch((err) => {
      console.log(err);
    });

  axios
    .get(`${process.env.REACT_APP_API_URI}/wallet/payment`, {
      headers: {
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
console.log(sum)
      setWalletPayment(sum);
    })
    .catch((err) => {
      console.log(err);
    });

  },[])



  return (
    <div  id="WalletPage">
    {showSubDetail ? <SubDetailModal showSubEdit ={showSubEdit} closeCancellationModal={ closeCancellationModal} closeSubDetailEditModal={closeSubDetailEditModal} oepnSubDetailEditModal={openSubDetailEditModal} showCancellation={showCancellation}  openCancellationModal={openCancellationModal} closeSubModal={closeSubModal}></SubDetailModal> : null}
      <div className="WalletPage_background">
        <WalletPageTop></WalletPageTop>

        <WalletPageCenter
      walletInfo={walletInfo}
        // showCancellation={showCancellation}
          openSubModal={openSubModal}
        />
        <WalletPageBottom       
        
        // walletInfo={walletInfo}
/>
      </div>
    </div>
  );
};

export default WalletPage;
