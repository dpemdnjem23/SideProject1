import SharePagiNation from "Components/Share/pagiNation";
import PagiNation from "Components/Share/pagiNation";
import ShareCard from "Components/Share/sharePageCard";
import React, { useState,useEffect } from "react";
import Loading from "Components/Common/loading";
import { paginationuseStore, shareCarduseStore } from "utils/state";
import moment from "moment";
import "../css/pages/SharePage.css";
import CardModal from "Components/Modal/cardModal";
import axios from "axios";
const SharePage = () => {
  const {
    setShareInfo,
    setLoading,
    shareInfo,
    setCardIndex,
    setClickModalNum,
    setCardModal,
    loading,
    cardModal,
  } = shareCarduseStore();


  const closeCardModal = () => {
    setCardModal(false);
  };


  //  const [loading, setLoading] =useState(true)

  // background-color: rgb(247, 249, 250);
  return (
    <div onClick={closeCardModal} id="sharePage">

      <div onClick={(e) => e.stopPropagation()} className="sharePage_section">
        {/* <> */}
        {cardModal ? <CardModal></CardModal> : null}


            <div className="sharePage_text">
              <h1>구독공유</h1>
              <p>서로에게 우리가 가진 구독을 소개해보아요.</p>
            </div>
              <ShareCard></ShareCard>
              <SharePagiNation></SharePagiNation>
       
      </div>
    </div>
  );
};

export default SharePage;
