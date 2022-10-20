import SharePagiNation from "Components/Share/pagiNation";
import PagiNation from "Components/Share/pagiNation";
import ShareCard from "Components/Share/sharePageCard";
import React, { useState } from "react";
import Loading from "Components/Common/loading";
import { paginationuseStore,shareCarduseStore } from "utils/state";
import moment from 'moment'
import "../css/pages/SharePage.css";
import CardModal from "Components/Modal/cardModal";
const SharePage = () => {
  const {setShareInfo, setLoading,shareInfo,setCardIndex,setClickModalNum,setCardModal,loading,cardModal} = shareCarduseStore()

  const closeCardModal = () =>{
    setCardModal(false)
  }
  console.log('monet',moment().format)
  console.log(new Date(2021,7,20,1,33,54))
//  const [loading, setLoading] =useState(true)

  // background-color: rgb(247, 249, 250);
  return (
    <div onClick={closeCardModal} id="sharePage">
      {loading ? <Loading></Loading> : null}
      {cardModal?<CardModal></CardModal>:null}


      <div onClick={(e)=>e.stopPropagation()} className="sharePage_section">
        <div className="sharePage_text">
          <h1>구독공유</h1>
          <p>서로에게 우리가 가진 구독을 소개해보아요.</p>
        </div>
        <ShareCard ></ShareCard>
        <SharePagiNation></SharePagiNation>
      </div>
    </div>
  );
};

export default SharePage;
