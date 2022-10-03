import SharePagiNation from "Components/Share/pagiNation";
import PagiNation from "Components/Share/pagiNation";
import ShareCard from "Components/Share/sharePageCard";
import React from "react";

import "../css/pages/SharePage.css";
const SharePage = () => {
  // background-color: rgb(247, 249, 250);
  return (
    <div id="sharePage">
      <div className="sharePage_section">
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
