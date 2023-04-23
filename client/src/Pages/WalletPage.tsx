import WalletPageBottom from "Components/Wallet/walletPageBottom";
import WalletPageCenter from "Components/Wallet/walletPageCenter";
import WalletPageTop from "Components/Wallet/walletPageTop";
import SubDetailModal from "Components/Modal/subDetailModal";
import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import {
  accessToken,
  dateState,
  registSubInfoState,
  useWalletStore,
  walletPageCostState,
} from "utils/state";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] =  'Bearer token'
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";
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
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";

import "../css/pages/WalletPage.css";
import Loading from "Components/Common/loading";
import EmptyPage from "Components/Common/emptyPage";
import SubRegistInfo from "Components/Mypage/mypagesub/subregistInfo";
import { instance } from "App";

const WalletPage = () => {
  const {
    walletInfo,
    setWalletInfo,
    setShowSubEdit,
    clickModalNum,
    showSubDetail,
    setClickModalNum,
    showSubEdit,
    setShowSubDetail,
  } = useWalletStore();

  const { selected, subCash, setWalletInfoAdd, walletInfoAdd } =
    registSubInfoState();

  // const [showSubDetail, setShowSubDetail] = useState<boolean>(false);
  // const [userEdit, setUserEdit] = useState<boolean>(false);

  const [walletSubCost, setWalletSubCost] = useState<number>(0);

  // const [clickModalNum,setClickModalNum] = useState<number>(0)
  const [arrIndex, setArrIndex] = useState<number>(0);
  const [showCancellation, setShowCancellation] = useState<boolean>(false);
  const [showRegist, setShowRegist] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  // const{setWalletSubCost,setWalletPayment} =walletPageCostState()

  // useEffect(() => {
  //   if (!isLogin) {
  //     window.location.assign('/signin');
  //   }

  // useEffect(()=>{

  // },[])
  // 각각의 모달을 나오게 하는법 =>
  // 몇번째 모달을 눌렀는지 상태정보를 state에 저장한다

  // instance

  const openSubModal = (num: number, id: number) => {
    setArrIndex(num);
    setClickModalNum(id);
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

  useEffect(() => {
    axios
      .get(`/wallet/info`)
      .then((res) => {
        let sum = 0;

        const costSum = res.data.data.map((pre: { cost: number }) => {
          return pre.cost;
        });

        for (let i = 0; i < costSum.length; i++) {
          sum = sum + costSum[i];
        }

        setWalletSubCost(sum);

        setWalletInfo(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="WalletPage">
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {walletInfo.length < 0 ? (
            <EmptyPage></EmptyPage>
          ) : (
            <>
              {showSubDetail ? (
                <SubDetailModal
                  // key={el.id}
                  // walletInfo={el}
                  arrIndex={arrIndex}
                  // walletInfo={walletInfo}
                  closeCancellationModal={closeCancellationModal}
                  showCancellation={showCancellation}
                  openCancellationModal={openCancellationModal}
                  closeSubModal={closeSubModal}
                ></SubDetailModal>
              ) : null}

              <div className="WalletPage_background">
                <WalletPageTop></WalletPageTop>

                <WalletPageCenter
                  // walletInfo={walletInfo}
                  // showCancellation={showCancellation}
                  openSubModal={openSubModal}
                />
                <WalletPageBottom
                  walletSubCost={walletSubCost}
                  // walletInfo={walletInfo}
                />
              </div>
            </>
          )}
        </>
      )}

      {/* // : null} */}
    </div>
  );
};

export default WalletPage;
