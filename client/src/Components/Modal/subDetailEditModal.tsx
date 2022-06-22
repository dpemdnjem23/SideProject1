import SubRegistPeriod from "Components/Mypage/mypagesub/subregistPeriod";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// declare module 'react-calendar'
import "../../css/common/modal/subDetailEditModal.css";

interface subDetailEdit {
  closeSubDetailEditModal: () => void;
}
const SubDetailEditModal: React.FC<subDetailEdit> = ({
  closeSubDetailEditModal,
}) => {
  const today = moment();

  // const[value,setValue] = useState<Mom>(new Date())

  // console.log(value)
  return (
    <div onClick={() => closeSubDetailEditModal()} id="SubDetailEdit_Modal">
      <div
        onClick={(e) => e.stopPropagation()}
        className="SubDetailEdit_Modal_section"
      >
        <div className="SubDetailEdit_modal_title_section">
          <span className="SubDetailEdit_modal_title_section_title">
            구독 정보를 변경하시겠습니까?
          </span>
          <span className="SubDetailEdit_modal_title_section_title2">
            변경 하고싶은 정보 를 형식에 맞게 넣어주세요
          </span>
        </div>

        <div className="SubDetailEdit_modal_section_sub">
          <div className="SubDetailEdit_modal_section_sub_pay">
            <span className="SubDetailEdit_modal_section_sub_pay_text">
              요금
            </span>
            <input
              className="SubDetailEdit_modal_section_sub_pay_pay"
              placeholder="3,000원"
            ></input>
          </div>
          <div className="SubDetailEdit_modal_section_sub_cycle">
            <div className="cycle_text">
              <span>주기</span>
            </div>
            <input placeholder="년"></input>
            <input placeholder="월"></input>
            <input placeholder="일"></input>
          </div>

          <div className="SubDetailEdit_modal_section_sub_start">
            <span>시작일</span>

            <Link to="/calendarselect">
              <div>
                <span>
                  {today.format("yyyy")} 년 {today.format("mm")} 월 {' '}
                  {today.format("d")} 일
                </span>
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                {/* </div> */}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubDetailEditModal;
