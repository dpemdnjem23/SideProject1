import React, { useEffect, useState } from "react";
import moment from "moment";
import Mypagebar from "Components/Mypage/mypagebar";
import Mypageuser from "Components/Mypage/mypageuser";
import Mypagesub from "Components/Mypage/mypagesub";
import MypagePassEdit from "Components/Mypage/mypagePassEdit";
import NicknameNotificationModal from "Components/Modal/NicknameNotificationModal";

import MobileMyPage from "Components/Mypage/mobileMyPage";
import "../css/pages/Mypage.css";
import MypageEdit from "Components/Mypage/mypageuseredit";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";
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
  mobileMypageUseStore,
} from "utils/state";
import axios from "axios";
import MypageSocialEdit from "Components/Mypage/mypageSocialUserEdit";
import PassNotificationModal from "Components/Modal/passwordNotificationModal";
import MobileMyPageMenu from "Components/Modal/mobileMyPageMenu";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-type"] = "application/json";

const MyPage = () => {
  const { setMobileMenu, mobileMenu } = mobileMypageUseStore();

  const navigate = useNavigate();
  const [subLength, setSubLength] = useState<number>(0);

  const userinfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || `{}`
  );

  const [nick, setNick] = useState<string>("");

  const { showNicknameNotiModal, showPasswordNotiModal } =
    mypageNotiModalState();
  const accessToken: string | null =
    localStorage.getItem("accessToken") || null;
  const [showRegist, setShowRegist] = useState<boolean>(false);

  const openRegist = () => {
    setShowRegist(true);
  };

  const today = moment().format("YYYY-MM-DD");

  const { setDelUser, setEditUser, editUser, delUser, passEditUser } =
    showMypageState();

  const { cycleCal, setCycleCal } = cycleState();

  const { dateCal, setDateCal } = dateState();

  const { setSelected, setSubCash } = registSubInfoState();

  const [subPayment, setSubPayment] = useState<number>(0);
  const [subCost, setSubCost] = useState<number>(0);

  // const { setPaymentCost, setSubCost } = mypageSubCostState();

  const { setMypagePaymentManageCost, setMypagePaymentManageDate } =
    mypagePaymentManagementState();
  //mypage 화면에 도달할때마다

  const resetState = () => {
    setCycleCal({ year: "", day: "", month: "" });
    setDateCal(moment());
    setSelected("");
    setSubCash("");
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

        // setPaymentCost(sum);
      })
      .catch((err) => {
        console.log(err);
      });


  useEffect(() => {
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
          <MobileMyPage></MobileMyPage>

          {mobileMenu ? (
            <MobileMyPageMenu></MobileMyPageMenu>
          ) : (
            <>
              <div className="Mypage_info_section">
                {editUser || delUser || passEditUser ? null : (
                  <Mypageuser subLength={subLength} />
                )}
                {editUser && userinfo.social_user === false ? (
                  <MypageEdit />
                ) : null}
                {delUser ? <MypageWithdrwal /> : null}
                {editUser && userinfo.social_user ? <MypageSocialEdit /> : null}
                {passEditUser ? <MypagePassEdit></MypagePassEdit> : null}

                {/* {paylist?<Myp} */}

                <Mypagesub openRegist={openRegist} />
              </div>
              <div className="Mypage_bar_section">
                <Mypagebar />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
