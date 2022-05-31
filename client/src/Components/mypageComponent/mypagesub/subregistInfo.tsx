import React from "react";

import '../../../css/components/MyPage/MypageSub/subregistInfo.css'
const SubRegistInfo = () => {
  return (
    <div id="SubregistInfo">
      <div className="SubregistInfo_section">
        <span>구독 추가하기</span>
        <span>구독 서비스 정보를 입력해 등록해주세요</span>
      </div>
      <div className="SubregistInfo_section">
        <div>
          <div>서비스이름</div>
          <input type="text" placeholder="어떤 구독을 등록할까요?"></input>
        </div>
<div>

<div>구독 요금</div>
<input type="text" placeholder="얼마에 구독중 이신가요?"></input>
</div>
      
      </div>
    </div>
  );
};

export default SubRegistInfo;
