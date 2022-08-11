import React, { useEffect, useState } from "react";
import moment from "moment";
import Mypagebar from "Components/Mypage/mypagebar";
import Mypageuser from "Components/Mypage/mypageuser";
import Mypagesub from "Components/Mypage/mypagesub";
import MypagePassEdit from "Components/Mypage/mypagePassEdit";
import NicknameNotificationModal from "Components/Modal/NicknameNotificationModal";

import "../css/pages/Mypage.css";
import MypageEdit from "Components/Mypage/mypageuseredit";
import { BrowserRouter, Route, Routes, Outlet,useNavigate } from "react-router-dom";
import RegisterPage from "./Mypage/SubReigstPage";
import MypageWithdrwal from "Components/Mypage/mypageuserWithdrawal";
import {
  showMypageState,
  dateState,
  cycleState,
  registSubInfoState,
  mypageSubCostState,
  mypagePaymentManagementState,
  mypageNotiModalState,
} from "utils/state";
import axios from "axios";
import MypageSocialEdit from "Components/Mypage/mypageSocialUserEdit";
import PassNotificationModal from "Components/Modal/passwordNotificationModal";
import { userInfo } from "os";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-type"] = "application/json";

const MyPage = () => {

  const navigate = useNavigate()
  const [subLength, setSubLength] = useState<number>(0);


  const userinfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || `{}`
  );

const [nick,setNick] = useState<string>('')
  

  const { showNicknameNotiModal, showPasswordNotiModal } =
    mypageNotiModalState();
  const accessToken: string | null =
    localStorage.getItem("accessToken") || null;
  const [showRegist, setShowRegist] = useState<boolean>(false);

  const openRegist = () => {
    setShowRegist(true);
  };

  const today = moment().format('YYYY-MM-DD')


  const { setDelUser, setEditUser, editUser, delUser, passEditUser } =
    showMypageState();

  const { setCycle, cycle, cycleCal, setCycleCal } = cycleState();

  const { dateCal, setDateCal } = dateState();

  const { setSelected, setSubCash } = registSubInfoState();

  const [subPayment,setSubPayment] = useState<string>('')
  const [subCost,setSubCost] = useState<string>('')

  const { setPaymentCost, setSubCost } = mypageSubCostState();

  const { setMypagePaymentManageCost, setMypagePaymentManageDate } =
    mypagePaymentManagementState();
  //mypage 화면에 도달할때마다

  const resetState = () => {
    setCycleCal({ year: "", day: "", month: "" });
    setDateCal(moment());
    setSelected("");
    setSubCash("");
  };

  const paymentManagement = () => {
    let sum = 0;
    //결제일과 결제금액 =>

    //가장 적게남은 결제일 의 결제금액의 합을 보여준다

    axios
      .get(`${process.env.REACT_APP_API_URI}/wallet/paymentmanage`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        //start_date+cycle cycle은 cycle 주기마다 cycle을 더해야한다
        //그러면 today가 end_date(start+cycle)에 도달했을때
        //start_date 를 end_date로 바꾸고 다시 end_date를 정한다.

        let paymentDate:any;
        const sumCostArr = res.data.data.map((el: { cost: number }) => {
          return el.cost;
        });

        for (let i = 0; i < sumCostArr.length; i++) {
          sum = sum + sumCostArr[i];
        }

        console.log(sum,sumCostArr)

        if(sumCostArr.length===0){
         paymentDate = '0'

        }
        else{
          paymentDate = Math.abs(moment(today).diff(sumCostArr[0].dataValues.end_date,'days'))||0

        }



        setMypagePaymentManageCost(sum);
        setMypagePaymentManageDate(paymentDate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calSubCost = () =>
    axios
      .get(`${process.env.REACT_APP_API_URI}/wallet/info`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const costSum = res.data.data.map((pre: { cost: number }) => {
          return pre.cost;
        });

        let sum = 0;

        for (let i = 0; i < costSum.length; i++) {
          sum = sum + costSum[i];
        }


                setSubLength(res.data.data.length);

        setSubCost(sum);
      })
      .catch((err) => {
        console.log(err);
      });

  const calPaymentCost = () =>
    axios
      .get(`${process.env.REACT_APP_API_URI}/wallet/payment`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const costSum = res.data.data.map((pre: { cost: number }) => {
          return pre.cost;
        });

        let sum = 0;

        for (let i = 0; i < costSum.length; i++) {
          sum = sum + costSum[i];
        }

        setPaymentCost(sum);
      })
      .catch((err) => {
        console.log(err);
      });


  useEffect(() => {
    paymentManagement();
    calSubCost();
    calPaymentCost();
    resetState();


  }, []);

  // useEffect(()=>{

  // },)


  //가운데 메인 내정보
  //사이드 정보

  // const [paylist, setPayList] = useState<boolean>(false);

  //유저 정보 수정을 누르면 useEdit으로 바뀐다.

  //유저 정보 수정을 눌렀을때, socila_user가 true라면 socialEdit으로

  return (
    <div id="Mypage">
      {showNicknameNotiModal ? <NicknameNotificationModal /> : null}
      {showPasswordNotiModal ? <PassNotificationModal /> : null}

      <div className="Mypage_background">
        <div className="Mypage_section">
          <div className="Mypage_info_section">
            {editUser || delUser || passEditUser ? null : <Mypageuser subLength={subLength} />}
            {editUser && userinfo.social_user === false ? <MypageEdit /> : null}
            {delUser ? <MypageWithdrwal /> : null}
            {editUser && userinfo.social_user ? <MypageSocialEdit /> : null}
            {passEditUser ? <MypagePassEdit></MypagePassEdit> : null}

            {/* {paylist?<Myp} */}

            <Mypagesub openRegist={openRegist} />
          </div>
          <div className="Mypage_bar_section">
            <Mypagebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
