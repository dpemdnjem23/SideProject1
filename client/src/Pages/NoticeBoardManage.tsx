import ManageContents from "Components/SharePageManage/ManageContents";
import React from "react";

import "../css/pages/NoticeBoardManage.css";
const NoticeBoardManage = () => {
  return (
    <div className="NoticeBoardManage">
      <div className="NoticeBoardManage_section">
        <div className="NoticeBoardManage_text">
          <h1> 구독 공유 관리</h1>
          <p>내가 공유 했던 구독 들을 수정, 삭제로 관리할수 있습니다.</p>
        </div>
        <ManageContents></ManageContents>
      </div>
      <div></div>
    </div>
  );
};
export default NoticeBoardManage;
