import React from "react";

import "../../../css/components/MyPage/MypageSub/subregistPeriod.css";

const SubRegistPeriod = () => {
  return (
    <div className="SubregistPeriod_section">
      <div className="SubregistPeriod_section_sub">
        <span className='SubregistPeriod_section_sub_title'>구독 정보</span>
      </div>

      <div className="SubregistPeriod_section_sub subyear">
      <span className='s'>구독 주기</span>
        <input placeholder ='년' className='date'></input>
        <input placeholder ='월' className='date'></input>
        <input placeholder ='일' className='date'></input>
      
        </div>
      <div className="SubregistPeriod_section_sub subyear">

     
        <span className='SubregistPeriod_section_sub_start'> 구독 시작</span>
        
        <input type='date' value='2019-09-30'  className='a'></input>
   </div>
    </div>
  );
};

export default SubRegistPeriod;
