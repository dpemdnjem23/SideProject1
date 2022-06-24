import WalletPageBottom from "Components/Wallet/walletPageBottom";
import WalletPageCenter from "Components/Wallet/walletPageCenter";
import WalletPageTop from "Components/Wallet/walletPageTop";
import SubDetailModal from "Components/Modal/subDetailModal";
import React, { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// interface showSubDetailModal {
//   openSubModal: () => void;
//   subDetail: boolean;
//   closeSubModal: () => void;
//   openCancellationModal: () =>void
//   showCancellation:boolean
//   openSubDetailEditModal: () => void
//   closeSubDetailEditModal:() =>void
//   showSubEdit:boolean
//   closeCancellationModal:() =>void
// }

import "../css/pages/WalletPage.css";
const WalletPage = () => {
  const [showSubDetail, setShowSubDetail] = useState<boolean>(false);
  // const [userEdit, setUserEdit] = useState<boolean>(false);

  const [showCancellation, setShowCancellation] = useState<boolean>(false);
  const [showSubEdit, setShowSubEdit] = useState<boolean>(false);
  const [showRegist, setShowRegist] = useState<boolean>(false);



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

  return (
    <div  id="WalletPage">
    {showSubDetail ? <SubDetailModal showSubEdit ={showSubEdit} closeCancellationModal={ closeCancellationModal} closeSubDetailEditModal={closeSubDetailEditModal} oepnSubDetailEditModal={openSubDetailEditModal} showCancellation={showCancellation}  openCancellationModal={openCancellationModal} closeSubModal={closeSubModal}></SubDetailModal> : null}
      <div className="WalletPage_background">
        <WalletPageTop></WalletPageTop>

        <WalletPageCenter
        // showCancellation={showCancellation}
          openSubModal={openSubModal}
        />
        <WalletPageBottom></WalletPageBottom>
      </div>
    </div>
  );
};

export default WalletPage;
