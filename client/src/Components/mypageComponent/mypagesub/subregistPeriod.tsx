import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import "../../../css/components/MyPage/MypageSub/subregistPeriod.css";

const SubRegistPeriod = () => {
  // const []

  const month = moment().format("MM");
  const day = moment().format("D");
  const year = moment().format('YYYY')

  return (
    <div className="SubregistPeriod_section">
      <div className="SubregistPeriod_section_sub">
        <span className="SubregistPeriod_section_sub_title">구독 정보</span>
      </div>

      <div className="SubregistPeriod_section_sub subyear">
        <span className="s">구독 주기</span>
        <input placeholder="년" className="date"></input>
        <input placeholder="월" className="date"></input>
        <input placeholder="일" className="date"></input>
      </div>
      <div className="SubregistPeriod_section_sub subyear">
        <span className="SubregistPeriod_section_sub_start"> 구독 시작</span>
        <Link to='/calendarselect'>
        <div className="SubregisterPeriod_section_sub_date_section">
          <span className="SubregistPeriod_section_sub_date_section_text">
           {year}년 {month}월 {day}일
          </span>
          <FontAwesomeIcon className="Arrow" icon={faArrowRight} />
        </div>
        </Link>
      </div>
    </div>
  );
};

export default SubRegistPeriod;
