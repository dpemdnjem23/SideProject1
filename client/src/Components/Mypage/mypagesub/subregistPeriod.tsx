import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import "../../../css/components/MyPage/MypageSub/subregistPeriod.css";
import { cycleState, dateState } from "utils/state";

const SubRegistPeriod = () => {
  const {setCycle} = cycleState()

  const {dateCal,setDateCal} =dateState()

  const [cycleCal,setCycleCal]= useState<any>({day:0,year:0,month:0})

  const handleCycleInfo =(e:React.ChangeEvent<HTMLInputElement>) =>{
    //주기는 계속 반복되어야 한다
if(e.target.id==='year'){
  setCycleCal({...cycleCal, year:e.target.value})
}
if(e.target.id==='month'){
  setCycleCal({...cycleCal, month:e.target.value})
}
if(e.target.id==='day'){
  setCycleCal({...cycleCal, day:e.target.value})
}
// dateCal.add
// console.log(cycleCal.day,cycleCal.month*30,cycleCal.year)
setCycle(cycleCal.day+cycleCal.month*30+cycleCal.year*365)

  }

//구독 주기를 입력 받아

 
  return (
    <div className="SubregistPeriod_section">
      <div className="SubregistPeriod_section_sub">
        <span className="SubregistPeriod_section_sub_title">구독 정보</span>
      </div>

      <div className="SubregistPeriod_section_sub subyear">
        <span className="s">구독 주기</span>
        <input id='year' onChange={handleCycleInfo} placeholder="년" className="date"></input>
        <input id='month' onChange={handleCycleInfo}  placeholder="월" className="date"></input>
        <input id='day' onChange={handleCycleInfo}  placeholder="일" className="date"></input>
      </div>
      <div className="SubregistPeriod_section_sub subyear">
        <span className="SubregistPeriod_section_sub_start"> 구독 시작</span>
        <Link to="/calendarselect">
          <div className="SubregisterPeriod_section_sub_date_section">
            <span className="SubregistPeriod_section_sub_date_section_text">
            {
    dateCal.locale("ko").format("YYYY") +
      " 년 " +
      dateCal.locale("ko").format("MM") +
      " 월 " +
      dateCal.locale("ko").format("DD") +
      " 일"
  }
            </span>
            <FontAwesomeIcon className="Arrow" icon={faArrowRight} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SubRegistPeriod;
