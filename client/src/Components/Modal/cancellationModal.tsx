import React from "react";

import "../../css/common/modal/cancellationModal.css";


interface cancellationModal {

    closeCancellationModal: () =>void
}

const CancellationModal:React.FC<cancellationModal> = ({closeCancellationModal}) => {
  return (
    <div id="Cancellation_Modal">
      <div className="Cancellation_Modal_section">
        <div className="Cancellation_Modal_section_sub">
          <span className="Cancellation_Modal_section_sub_title">
            구독을 삭제할까요?
          </span>
        </div>
        <span>
          구독을 삭제한다면 다시 표시할 수 없으며, 더이상 섭개더에서
          확인해드리지 않습니다.
        </span>
        <div className="Cancellation_Modal_bt_section">
       
          <button onClick={()=>closeCancellationModal()} className="Cancellation_Modal_bt_cancel">취소하기</button>
          <button className="Cancellation_Modal_bt_delete">삭제하기</button>
        </div>
      </div>
    </div>
  );
};

export default CancellationModal;
