import CancellationButton from "Components/common/cancellationButoon";
import RegistButton from "Components/common/registButton";
import ShareRegistInfo from "Components/mypageComponent/mypageshare/shareregistInfo";
import React from "react";

import "../../css/pages/ShareRegisterPage.css";
const ShareRegisterPage = () => {
  return (
    <div id="ShareRegisterPage">
      <ShareRegistInfo />

      <div className="SharRegisterPage_bt">
        <CancellationButton />
        <RegistButton />
      </div>
    </div>
  );
};
export default ShareRegisterPage;
