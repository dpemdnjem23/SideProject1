import React, { useState } from "react";

import CancellationModal from "./cancellationModal";
import "../../css/common/modal/subDetailModal.css";
import SubDetailEditModal from "./subDetailEditModal";

type modal = {
  closeSubModal: () => void;
  openCancellationModal: () => void;
  showCancellation: boolean;
  oepnSubDetailEditModal: () => void;
  closeSubDetailEditModal:() => void;
  showSubEdit:boolean;
  closeCancellationModal:() =>void
};
const SubDetailModal: React.FC<modal> = ({
  oepnSubDetailEditModal,
  showCancellation,
  closeSubModal,
  openCancellationModal,
  showSubEdit,
  closeCancellationModal
}) => {
  console.log("모달시작");

  return (
    <div onClick={() => closeSubModal()} id="SubDetail_Modal">
      <div
        onClick={(e) => e.stopPropagation()}
        className="SubDetail_Modal_section"
      >
        {showCancellation ? <CancellationModal closeCancellationModal={closeCancellationModal}/> : null}
        {showSubEdit? <SubDetailEditModal /> : null}
        <header>
          <button onClick={() => closeSubModal()} className="close">
            X
          </button>
        </header>
        <img src="./images/netflex.png" />
        <span>넷플릭스</span>

        <div className="SubDetail_Modal_sub_section">
          <span className="SubDetail_Modal_sub_section_text">
            {" "}
            50,000원 / 1달{" "}
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

        <div>
          <span>최근 기록을 보여줍니다.</span>

          <div>
            <span>그림</span>
            <span>트위치</span>
            <span>가격</span>
            <span>날짜</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubDetailModal;
