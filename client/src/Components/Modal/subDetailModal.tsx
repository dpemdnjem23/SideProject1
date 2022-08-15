import React, { useState, useEffect } from "react";

import CancellationModal from "./cancellationModal";
import "../../css/common/modal/subDetailModal.css";
import SubDetailEditModal from "./subDetailEditModal";
import { useWalletStore } from "utils/state";
import axios from "axios";

type modal = {
  closeSubModal: () => void;
  openCancellationModal: () => void;
  showCancellation: boolean;
  closeCancellationModal: () => void;

  clickModalNum: number;

  arrIndex: number;
};
const SubDetailModal: React.FC<modal> = ({
  showCancellation,
  closeSubModal,
  openCancellationModal,
  closeCancellationModal,
  arrIndex,
  clickModalNum,
  // id
}) => {
  const { walletInfo, setWalletInfo, setShowSubEdit, showSubEdit } =
    useWalletStore();

  const openSubDetailEditModal = () => {
    setShowSubEdit(true);

  };

  return (
    <div onClick={() => closeSubModal()} id="SubDetail_Modal">
      <div
        onClick={(e) => e.stopPropagation()}
        className="SubDetail_Modal_section"
      >
        {showCancellation ? (
          <CancellationModal
            clickModalNum={clickModalNum}
            closeCancellationModal={closeCancellationModal}
          />
        ) : null}
        {showSubEdit ? <SubDetailEditModal             clickModalNum={clickModalNum}
 arrIndex={arrIndex} /> : null}

        <header>
          <button onClick={() => closeSubModal()} className="close">
            X
          </button>
        </header>
        {/* {arrIndex? */}

        <img src={walletInfo[arrIndex].image} />
        <span>{walletInfo[arrIndex].name}</span>
        {/* 
        <span>{el.cycleYear ? el.cycleYear + "년" : ""}</span>
            <span>&nbsp;{ el.cycleMonth ? el.cycleMonth + "달" : ""}</span>
            <span>&nbsp;{el.cycleDay ? el.cycleDay + "일" : ""}</span> */}

        <div className="SubDetail_Modal_sub_section">
          <span className="SubDetail_Modal_sub_section_text">
            {walletInfo[arrIndex].cost} /{" "}
            {walletInfo[arrIndex].cycleYear
              ? walletInfo[arrIndex].cycleYear + "년"
              : ""}
            &nbsp;{" "}
            {walletInfo[arrIndex].cycleMonth
              ? walletInfo[arrIndex].cycleMonth + "달"
              : ""}
            &nbsp;{" "}
            {walletInfo[arrIndex].cycleDay
              ? walletInfo[arrIndex].cycleDay + "일"
              : ""}
          </span>
          <span className="SubDetail_Modal_sub_section_text2">
            1일 남았어요!
          </span>
          {/* <CancellationButton></CancellationButton> */}
        </div>
        <div className="SubDetail_Modal_bt_section">
          <button
            onClick={() => openCancellationModal()}
            className="SubDetail_Modal_bt_delete"
          >
            삭제하기
          </button>
          <button
            onClick={openSubDetailEditModal}
            className="SubDetail_Modal_bt_modify"
          >
            변경하기
          </button>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default SubDetailModal;
