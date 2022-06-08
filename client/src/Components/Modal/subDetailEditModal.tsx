import React from "react";''

import '../../css/common/modal/subDetailEditModal.css'

const SubDetailEditModal = () => {
  return (
    <div id="SubDetailEdit_Modal">
      <div className="SubDetailEdit_Modal_section">
        <div>
          <span></span>
          <span></span>
        </div>

        <div>
          <div>
            <span>이미지</span>
            <span>요금</span>
            <span>6,000원</span>
          </div>
          <div>
            <span>이미지</span>

            <span>주기</span>
            <span>1달</span>
          </div>

          <div>

              <span>이미지</span>
              <span>시작일</span>
              <span>6월 30일</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubDetailEditModal;
