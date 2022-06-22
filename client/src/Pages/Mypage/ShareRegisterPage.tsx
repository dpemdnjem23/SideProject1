import CancellationButton from "Components/Common/cancellationButoon";
import RegistButton from "Components/Common/registButton";
import ShareRegistInfo from "Components/Mypage/mypageshare/shareregistInfo";
import ShareRegistBoard from "Components/Mypage/mypageshare/shareregistBoard";
import React from "react";

import "../../css/pages/ShareRegisterPage.css";
const ShareRegisterPage = () => {
  return (
    <div id="ShareRegisterPage">
      <ShareRegistInfo />
      <ShareRegistBoard />

      <div className="SharRegisterPage_bt">
    
      <CancellationButton />
        <RegistButton />
      </div>
    </div>
  );
};
export default ShareRegisterPage;
