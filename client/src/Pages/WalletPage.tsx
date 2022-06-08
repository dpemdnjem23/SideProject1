import WalletPageBottom from "Components/walletcomponent/walletPageBottom";
import WalletPageCenter from "Components/walletcomponent/walletPageCenter";
import WalletPageTop from "Components/walletcomponent/walletPageTop";
import SubDetailModal from "Components/Modal/subDetailModal";
import React, { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

interface showSubDetailModal {
  openSubModal: () => void;
  subDetail: boolean;
  closeSubModal: () => void;
  openCancellationModal: () =>void
  showCancellation:boolean
  openSubDetailEditModal: () => void
  closeSubDetailEditModal:() =>void
  showSubEdit:boolean
  closeCancellationModal:() =>void
}

import "../css/pages/WalletPage.css";
const WalletPage: React.FC<showSubDetailModal> = ({
  subDetail,
  openSubModal,
  closeSubModal,
  openCancellationModal,
  showCancellation,
  openSubDetailEditModal,
  closeSubDetailEditModal,
  showSubEdit,
  closeCancellationModal,
}) => {
//   const [showSubDetail, setShowSubDetail] = useState<boolean>(false);
  //   const closeSubModal =() =>{
  //       setSubModal(false);
  //   }
  //   const openSubModal = () => {
  //     setSubModal(true);
  //   };

//   onClick = {() =>closeSubModal()}
  return (
    <div  id="WalletPage">
    {subDetail ? <SubDetailModal showSubEdit ={showSubEdit} closeCancellationModal={ closeCancellationModal} closeSubDetailEditModal={closeSubDetailEditModal} oepnSubDetailEditModal={openSubDetailEditModal} showCancellation={showCancellation}  openCancellationModal={openCancellationModal} closeSubModal={closeSubModal}></SubDetailModal> : null}
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
