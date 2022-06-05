import CancellationButton from "Components/common/cancellationButoon";
import RegistButton from "Components/common/registButton";
import ShareRegistInfo from "Components/mypageComponent/mypageshare/shareregistInfo";
import ShareRegistBoard from "Components/mypageComponent/mypageshare/shareregistBoard";
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
