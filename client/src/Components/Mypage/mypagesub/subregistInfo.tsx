import React from "react";

import "../../../css/components/MyPage/MypageSub/subregistInfo.css";
import MypageSelectBox from "./mypageSelectBox";
const SubRegistInfo = () => {

  // const onClickSelect = (e:React.MouseEvent<HTMLDivElement>) => {
  //   const isActive = e.currentTarget.className.indexOf("active") !== -1;

  //   console.log(isActive);
  //   if (isActive) {
  //     console.log(e.currentTarget.className);

  //     e.currentTarget.className = "select_box";
  //   } else {
  //     console.log(e.currentTarget.className);

  //     e.currentTarget.className = "select_box active";
  //   }
  // };
  return (
    <div  className="SubregistInfo_section">
      <div className="SubregistInfo_section_sub">
        <div className="SubregistInfo_section_title ">구독 추가하기</div>

        
          <p className="SubregistInfo_section_title2">
            구독 서비스 정보를 입력해 등록해주세요.
          </p>
    
      </div>

      {/* <div className="SubregistInfo_section2"> */}
      <div className="SubregistInfo_section_sub2">
        <div className="SubregistInfo_sub2_whatSub">
          <div className="SubregistInfo_sub2_whatsub_title">서비스이름</div>
          <MypageSelectBox></MypageSelectBox>
        </div>
        {/* </div> */}

        <div className="SubregistInfo_sub2_pay">
          <div className="SubregistInfo_section_sub2_pay_title">구독 요금</div>
          <input
            className="SubregistInfo_input"
            type="text"
            placeholder="얼마에 구독중 이신가요?"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default SubRegistInfo;
