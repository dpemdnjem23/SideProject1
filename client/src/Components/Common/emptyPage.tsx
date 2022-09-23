import React from "react";

import "../../css/common/emptyPage.css";

const EmptyPage = () => {
  return (
    <div className="emptyPage">
      <div className="emptyPage_image">
        <img src="/emptyWallet.png" />
      </div>
      <div className="emptyPage_contents">
        <span>지갑에 담긴 구독이 없습니다.</span>
        <div>마이페이지 에서 추가해주세요!</div>
      </div>
    </div>
  );
};

export default EmptyPage;
