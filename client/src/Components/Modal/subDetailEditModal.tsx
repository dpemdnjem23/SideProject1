import SubRegistPeriod from "Components/mypageComponent/mypagesub/subregistPeriod";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
// declare module 'react-calendar'
import "../../css/common/modal/subDetailEditModal.css";

interface subDetailEdit {
  closeSubDetailEditModal: () => void;
}
const SubDetailEditModal: React.FC<subDetailEdit> = ({
  closeSubDetailEditModal,
}) => {

  const[value,setValue] = useState<Date>(new Date())

  console.log(value)
  return (
    <div onClick={() => closeSubDetailEditModal()} id="SubDetailEdit_Modal">
      <div
        onClick={(e) => e.stopPropagation}
        className="SubDetailEdit_Modal_section"
      >

        <div className='SubDetailEdit_modal_title_section'>
          <span>구독 정보를 변경하시겠습니까?</span>
          <span>변경 하고싶은 정보 를 형식에 맞게 넣어주세요</span>
        </div>

        <div>
          <div>
      
            <span>요금</span>
            <input placeholder='요금'></input>
          </div>
          <div>

            <span>주기</span>
            <input placeholder="년"></input>
            <input placeholder="월"></input>
            <input placeholder='일'></input>
          </div>

          <div>
       
            <span>시작일</span>
            
            <span >6월 30일</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubDetailEditModal;
