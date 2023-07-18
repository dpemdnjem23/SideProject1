import ManageBoardContents from "Components/SharePageManage/ManageBoardContents";
import ManageBoardHeader from "Components/SharePageManage/ManageBoardHeader";
import React from "react";

import "../css/pages/NoticeBoardManage.css";
const NoticeBoardManage = () => {
  return (
    <div className="NoticeBoardManage">
      <div className="NoticeBoardManage_section">
        {/* <img src="/ready.jpg"></img> */}

        <div className="NoticeBoardManage_text">
          <h1> 구독 공유 관리</h1>
          <p>내가 공유 했던 구독 들을 수정, 삭제로 관리할수 있습니다.</p>
        </div>
      </div>
      <div>

        <ManageBoardHeader></ManageBoardHeader>
        <ManageBoardContents></ManageBoardContents>
      </div>
    </div>
  );
};
export default NoticeBoardManage;
