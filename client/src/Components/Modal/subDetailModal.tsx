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
  oepnSubDetailEditModal: () => void;
  closeSubDetailEditModal: () => void;
  showSubEdit: boolean;
  closeCancellationModal: () => void;
  // walletInfo:{
  //   name:string
  //   cost:number
  //   image:string
  // }
  clickModalNum: number;
};
const SubDetailModal: React.FC<modal> = ({
  oepnSubDetailEditModal,
  showCancellation,
  closeSubModal,
  openCancellationModal,
  showSubEdit,
  closeCancellationModal,
  closeSubDetailEditModal,
  // walletInfo,
  clickModalNum,
  // id
}) => {
  const { walletInfo, setWalletInfo } = useWalletStore();




  return (
    <div onClick={() => closeSubModal()} id="SubDetail_Modal">
      <div
        onClick={(e) => e.stopPropagation()}
        className="SubDetail_Modal_section"
      >
        {showCancellation ? (
          <CancellationModal clickModalNum={clickModalNum} closeCancellationModal={closeCancellationModal} />
        ) : null}
        {showSubEdit ? (
          <SubDetailEditModal
            closeSubDetailEditModal={closeSubDetailEditModal}
          />
        ) : null}

        <header>
          <button onClick={() => closeSubModal()} className="close">
            X
          </button>
        </header>
        {/* {clickModalNum? */}

        <img src={walletInfo[clickModalNum].image} />
        <span>{walletInfo[clickModalNum].name}</span>
        {/* 
        <span>{el.cycleYear ? el.cycleYear + "년" : ""}</span>
            <span>&nbsp;{ el.cycleMonth ? el.cycleMonth + "달" : ""}</span>
            <span>&nbsp;{el.cycleDay ? el.cycleDay + "일" : ""}</span> */}

        <div className="SubDetail_Modal_sub_section">
          <span className="SubDetail_Modal_sub_section_text">
            {walletInfo[clickModalNum].cost} /{" "}
            {walletInfo[clickModalNum].cycleYear
              ? walletInfo[clickModalNum].cycleYear + "년"
              : ""}
                &nbsp;{" "}
            {walletInfo[clickModalNum].cycleMonth
              ? walletInfo[clickModalNum].cycleMonth + "달"
              : ""}
            &nbsp;{" "}
            {walletInfo[clickModalNum].cycleDay
              ? walletInfo[clickModalNum].cycleDay + "일"
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
            onClick={() => oepnSubDetailEditModal()}
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
