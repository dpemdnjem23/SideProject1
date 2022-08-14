import SubRegistPeriod from "Components/Mypage/mypagesub/subregistPeriod";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// declare module 'react-calendar'
import "../../css/common/modal/subDetailEditModal.css";
import { cycleState, dateState, useWalletStore } from "utils/state";

interface subDetailEdit {
  arrIndex:number
}
const SubDetailEditModal: React.FC<subDetailEdit> = ({
  arrIndex
}) => {
  const today = moment();


  const {walletInfo,setWalletInfo,setShowSubEdit} = useWalletStore()

  const {dateCal,setDateCal,clearDateCal} =dateState()

  const {cycleCal,setCycleCal} = cycleState()


  const closeSubDetailEditModal = () => {
    setShowSubEdit(false);
  };


  // const [cycleCal,setCycleCal]= useState<{day:string,year:string,month:string}>({day:'',year:'',month:''})

  const handleCycleInfo =(e:React.ChangeEvent<HTMLInputElement>) =>{

    // setCycleCal(e.target.value)
    // 주기는 계속 반복되어야 한다
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

// console.log(cycleCal)
  }

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
              placeholder={walletInfo[arrIndex].cost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+' 원'}
            ></input>
          </div>
          <div className="SubDetailEdit_modal_section_sub_cycle">
            <div className="cycle_text">
              <span>주기</span>
            </div>
            <input value={cycleCal.year} type='number' id='year' onChange={handleCycleInfo} placeholder="년"></input>
            <input value={cycleCal.month} type='number' id='month' onChange={handleCycleInfo} placeholder="월"></input>
            <input value={cycleCal.day} type='number' id='day' onChange={handleCycleInfo} placeholder="일"></input>
          </div>

          <div className="SubDetailEdit_modal_section_sub_start">
            <span>시작일</span>

            <Link to="/calendarselect">
              <div>
                <span>
                  {dateCal.locale("ko").format("YYYY")} 년 {dateCal.locale("ko").format("MM")} 월 {' '}
                  {dateCal.locale("ko").format("DD")} 일
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
