import SubRegistPeriod from "Components/Mypage/mypagesub/subregistPeriod";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// declare module 'react-calendar'
import "../../css/common/modal/subDetailEditModal.css";
import {
  cycleState,
  dateState,
  registSubInfoState,
  useWalletStore,
} from "utils/state";
import axios from "axios";

interface subDetailEdit {
  arrIndex: number;
  // clickModalNum: number;
}
const SubDetailEditModal: React.FC<subDetailEdit> = ({
  arrIndex,
  
}) => {

  const navigate = useNavigate();
  const accessToken: string | null = localStorage.getItem("accessToken");
  const { walletInfo, setWalletInfo,clickModalNum, setShowSubEdit } = useWalletStore();

  const { dateCal, setDateCal, clearDateCal } = dateState();

  const { cycleCal, setCycleCal } = cycleState();

  const [walletDate,setWalletDate] = useState<string>(moment().format('YYYY-MM-DD'))

  const { setSubCash, subCash } = registSubInfoState();
  console.log(clickModalNum,'cliick')


  useEffect(() => {
    //에딧 모달에 들어오면

    setCycleCal({ ...cycleCal, year: walletInfo[arrIndex].cycleYear });

    setCycleCal({ ...cycleCal, month: walletInfo[arrIndex].cycleMonth });

    setCycleCal({ ...cycleCal, day: walletInfo[arrIndex].cycleDay });
  }, []);

  const inputPriceFormat = (str: string) => {
    const comma = (str: string) => {
      str = String(str);
      return Number(str).toLocaleString();
    };

    const uncomma = (str: string) => {
      str = String(str);

      return str.replace(/[^\d]+/g, "");
    };
    return comma(uncomma(str));
  };

  const closeSubDetailEditModal = () => {
    setShowSubEdit(false);
  };

  // const [cycleCal,setCycleCal]= useState<{day:string,year:string,month:string}>({day:'',year:'',month:''})

  const handleCycleInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setCycleCal(e.target.value)
    // 주기는 계속 반복되어야 한다
    if (e.target.id === "year") {
      setCycleCal({ ...cycleCal, year: e.target.value });
    }
    if (e.target.id === "month") {
      setCycleCal({ ...cycleCal, month: e.target.value });
    }
    if (e.target.id === "day") {
      setCycleCal({ ...cycleCal, day: e.target.value });
    }
  };

  const handelModifyWallet = () => {
    const number = subCash.replace(/,/g, "");
    const today = dateCal.format("YYYY-MM-DD");
    console.log(clickModalNum,today)

    axios
      .patch(
        `${process.env.REACT_APP_API_URI}/wallet/edit`,
        {
          cycleYear: cycleCal.year,
          cycleMonth: cycleCal.month,
          cycleDay: cycleCal.day,
          start_date: today,
          cost: number,
          id: clickModalNum,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        navigate("/wallet");
        location.reload()
        
      })
      .catch((err) => {
        alert("변경에 실패하였습니다.");
      });
  };

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
              value={subCash}
              onChange={(e) => setSubCash(inputPriceFormat(e.target.value))}
              className="SubDetailEdit_modal_section_sub_pay_pay"
              placeholder={
                walletInfo[arrIndex].cost
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + " 원"
              }
            ></input>
          </div>
          <div className="SubDetailEdit_modal_section_sub_cycle">
            <div className="cycle_text">
              <span>주기</span>
            </div>
            <input
              value={cycleCal.year}
              type="number"
              id="year"
              onChange={handleCycleInfo}
              placeholder="년"
            ></input>
            <input
              value={cycleCal.month}
              type="number"
              id="month"
              onChange={handleCycleInfo}
              placeholder="월"
            ></input>
            <input
              value={cycleCal.day}
              type="number"
              id="day"
              onChange={handleCycleInfo}
              placeholder="일"
            ></input>
          </div>

          <div className="SubDetailEdit_modal_section_sub_start">
            <span>시작일</span>

            <Link to="/calendarselect">
              <div>
                <span>
                  {dateCal.locale("ko").format("YYYY")} 년{" "}
                  {dateCal.locale("ko").format("MM")} 월{" "}
                  {dateCal.locale("ko").format("DD")} 일
                </span>
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                {/* </div> */}
              </div>
            </Link>
          </div>
          <div className="SubDetailEdit_modal_bt_section">
            <button
              onClick={() => closeSubDetailEditModal()}
              className="SubDetailEdit_modal_bt_cancel"
            >
              취소하기
            </button>

            <button
              onClick={handelModifyWallet}
              className="SubDetailEdit_modal_bt_modify"
            >
              변경하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubDetailEditModal;
