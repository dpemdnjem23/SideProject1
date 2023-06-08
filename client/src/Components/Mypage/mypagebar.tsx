import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  mobileMypageUseStore,
  mypagePaymentManagementState,
  mypageSubCostState,
  showMypageState,
  walletPageCostUseStore,
} from "utils/state";
import "../../css/components/MyPage/mypagebar.css";
import moment from "moment";
import {
  Route,
  BrowserRouter,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import { instance } from "App";
// const s = document.getElemnetsByClassName()

const Mypagebar = () => {
  const today: string | number = moment().format("YYYY-MM-DD");

  //한번더 클릭하면 원래대로 돌아가야한다.
  // const { setDelUser, setEditUser, editUser, delUser } = showMypageState();
  // const {paymentDay , setPaymentDay}  = useState<number>(0)
  const { setWalletPayment, setWalletSubCost, walletPayment, walletSubCost } =
    walletPageCostUseStore();
  const [subManageDate, setSubManageDate] = useState<number>(0);
  const [subManageCost, setSubManageCost] = useState<number>(0);

  const {
    setDelUser,
    setEditUser,
    editUser,
    delUser,
    passEditUser,
    setPassEditUser,
    setSocialEditUser,
    socialEditUser,
  } = showMypageState();
  const {
    mobileMenuName,
    mobileMenu,
    setMobileMenu,
    setMobileMenuName,
    setMobilePassEdit,
    setMobileUserEdit,
    mobilePassEdit,
    mobileUserEdit,
  } = mobileMypageUseStore();

  const accessToken: string | null = localStorage.getItem("accessToken");

  const handleEditUser = () => {
    //마이페이지에서 같은 걸 한번더 클릭하면 원래대로 돌아오도록 한다.
    if (editUser || delUser || passEditUser || socialEditUser) {
      setEditUser(false);
      setDelUser(false);
      setPassEditUser(false);
      setSocialEditUser(false);
      setMobilePassEdit(false);
      setMobileUserEdit(false);
      setMobileMenu(false);
      setMobileMenuName("마이페이지");
    } else {
      setMobilePassEdit(false);
      setMobileUserEdit(true);
      setEditUser(true);
      setDelUser(false);
      setMobileMenu(true);
      setMobileMenuName("회원 정보 수정");
    }
  };

  const handleDelUser = () => {
    //마이페이지에서 같은 걸 한번더 클릭하면 원래대로 돌아오도록 한다.
    if (delUser === true) {
      setDelUser(false);
      setEditUser(false);
    } else {
      setDelUser(true);
      setEditUser(false);
    }
  };

  const paymentManagement = () => {
    let sum = 0;
    //결제일과 결제금액 =>

    //가장 적게남은 결제일 의 결제금액의 합을 보여준다

    instance
      .get(`/wallet/paymentmanage`, {})
      .then((res) => {
        //start_date+cycle cycle은 cycle 주기마다 cycle을 더해야한다
        //그러면 today가 end_date(start+cycle)에 도달했을때
        //start_date 를 end_date로 바꾸고 다시 end_date를 정한다.

        let paymentDate: number;

        const sumCostArr = res.data.data.map((el: { cost: number }) => {
          return el.cost;
        });

        for (let i = 0; i < sumCostArr.length; i++) {
          sum = sum + sumCostArr[i];
        }

        if (sumCostArr.length === 0) {
          paymentDate = 0;
        } else {
          paymentDate = Math.abs(
            moment(today).diff(moment(res.data.data[0].end_date), "days")
          );
        }

        setSubManageCost(sum);
        setSubManageDate(paymentDate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    paymentManagement();

    instance
      .get(`/wallet/payment`, {})
      .then((res) => {
        const costSum = res.data.data.map((pre: { cost: number }) => {
          return pre.cost;
        });

        let sum = 0;

        for (let i = 0; i < costSum.length; i++) {
          sum = sum + costSum[i];
        }
        setWalletPayment(sum);
      })
      .catch((err) => {
        console.log(err);
      });

    instance
      .get(`/wallet/info`, {})
      .then((res) => {
        let sum = 0;

        const costSum = res.data.data.map((pre: { cost: number }) => {
          return pre.cost;
        });

        for (let i = 0; i < costSum.length; i++) {
          sum = sum + costSum[i];
        }

        setWalletSubCost(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //결제완룡 walletPayment
  //지출 총액은 전체 구독금액ㄷ에서
  //구독금액이 10만원, 결제완료가 5만원 5만원
  return (
    <>
      <div className="Mypage_bar_top container">
        <div className="Mypage_bar_top title">결제 현황 관리</div>
        <div className="Mypage_bar_top_section">
          <div className="Mypage_bar_top_section1">
            <span className="Mypage_bar_top_section1_days">결제 일 </span>
            <br></br>
            <span className="Mypage_bar_top_section1_day">
              {subManageDate} 일
            </span>

            {/* <span className="Mypage_bar_top_section1_pay2">결제 금액</span>
             */}
          </div>

          <div className="Mypage_bar_top_section2">
            <br></br>
            <span className="Mypage_bar_top_section2_slash">/</span>
          </div>
          <div className="Mypage_bar_top_section3">
            <span className="Mypage_bar_top_section1_pay">결제 금액</span>
            <br></br>

            <span className="Mypage_bar_top_section2_pay">
              {" "}
              {subManageCost
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
              원
            </span>
          </div>
        </div>
        {/* <span>3-days / 2 (결제금액)</span> */}
      </div>
      <div className="Mypage_bar_gap"></div>
      <div className="Mypage_bar_center container">
        <div className="Mypage_bar_center title">구독 정산 관리</div>
        <div className="Mypage_bar_center_section">
          <div className="Mypage_bar_center_section1">
            <span className="Mypage_bar_center_section1_comp">결제 완료</span>
            <br></br>

            <div className="Mypage_bar_center_section1_comp2">
              {walletPayment
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
              원
            </div>
          </div>

          <div className="Mypage_bar_center_section2">
            <br></br>
            <span className="Mypage_bar_center_section2_slash">/</span>
          </div>
          <div className="Mypage_bar_center_section3">
            <span className="Mypage_bar_center_section1_pay">지출 총액</span>
            <br></br>

            <span className="Mypage_bar_center_section1_pay2">
              {walletSubCost
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
              원
            </span>
          </div>
        </div>
        <div className="Mypage_bar_gap"></div>
      </div>
      <div className="Mypage_bar_gap"></div>
      <div className="Mypage_bar_bottom container">
        <div className="Mypage_bar_bottom title">섭개더 관리</div>
        <div className=" Mypage_bar_bottom_section">
          <Link to="/noticeBoard">
            <div className="Mypage_bar_bottom_section_text">구독 모음 관리</div>
          </Link>
          <div
            className="Mypage_bar_bottom_section_text"
            onClick={handleEditUser}
          >
            회원 정보 수정
          </div>
          <div
            className="Mypage_bar_bottom_section_text"
            onClick={handleDelUser}
          >
            회원탈퇴
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Mypagebar;
