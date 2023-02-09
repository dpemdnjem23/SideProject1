import React, { useEffect, useState } from "react";
import "../../css/common/mainHeader.css";
import MainPage from "../../Pages/MainPage";
import {
  Route,
  BrowserRouter,
  Link,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useStore } from "Components/Login/Login";
import MypageModal from "Components/Modal/MypageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import {
  alarmInfouseStore,
  isSigninState,
  mainheaderuseStore,
  paginationuseStore,
  showErrModalState,
  useWalletStore,
} from "utils/state";
import AlarmModal from "Components/Modal/alarmModal";
import MenuBar from "./menuBar";

const Mainheader = () => {
  const { page } = paginationuseStore();
  const {
    showMypageModal,
    showNumber,
    setShowNumber,
    setShowAlarmPage,
    mobileMyPageOn,
    mobileMyPage,
    showMypageModalOn,
    setInfoNumber,
    infoNumber,
  } = mainheaderuseStore();
  const limit = 6;
  const offset = page * limit;

  const navigate = useNavigate();
  const [showAlarmModal, setShowAlarmModal] = useState<boolean>(false);

  const { userSignin } = isSigninState();
  const { setShowSubEdit, setShowSubDetail } = useWalletStore();
  const { alarmInfo, setAlarmInfo, alarmText, setAlarmText } =
    alarmInfouseStore();

  const { setShowErrModal } = showErrModalState();

  const handleErrModal = () => {
    setShowSubDetail(false);
    setShowSubEdit(false);
    if (localStorage.getItem("accessToken")) {
      setShowErrModal(false);
    } else {
      navigate("/");
      setShowErrModal(true);
    }
  };

  const openShowMypageModal = () => {
    if (showMypageModal === false) {
      showMypageModalOn(true);
    } else {
      showMypageModalOn(false);
    }
  };

  const openAlarmModal = () => {
    setShowAlarmModal(true);
    setShowNumber(false);
    mobileMyPageOn(true);
  };

  const openMenuBar = () => {
    mobileMyPageOn(true);
  
    console.log(mobileMyPage);
    console.log("클릭");
    mobileMyPageOn(true);
  };

  let sum = 0;
  //alarmInfo중 false만 나오도록
  for (let i = 0; i < alarmInfo.length; i++) {
    if (alarmInfo[i].read === false) {
      sum++;
    }
  }

  useEffect(() => {
    setShowNumber(true);
  }, []);

  //   const clickToNotSign= () =>{
  // alert()

  //   }
  // onClick={(e) => e.stopPropagation()}
  return (
    <>
      <div id="header">
        <div className="logo">
          <Link to="/">
            <img width="60" src="./images/2.png" />
          </Link>
        </div>

        <div className="main_menu">
          <ul>
            <li className="menu">
              <Link to="/">메인페이지</Link>
            </li>
            <li className="menu">
              <Link onClick={handleErrModal} to="/wallet">
                구독지갑
              </Link>
            </li>
            <li className="menu">
              <Link to={`/share`}>구독공유</Link>
            </li>
            <li className="menu">
              <Link onClick={handleErrModal} to="/callendar">
                구독달력
              </Link>
            </li>

            {userSignin ? (
              <li className="menu">
                <div className="menu_bell_section">
                  <FontAwesomeIcon
                    onClick={openAlarmModal}
                    width="60"
                    className="menu_bell"
                    icon={faBell}
                  />
                  {showNumber ? (
                    <div className="menu_bell_number">{sum}</div>
                  ) : null}
                </div>
                <img
                  onClick={openShowMypageModal}
                  width="60"
                  src="./images/wallet-6551548.svg"
                ></img>
              </li>
            ) : (
              <li className="menu">
                <Link to="/login"> 로그인</Link>
              </li>
            )}
          </ul>
          {showMypageModal ? <MypageModal></MypageModal> : null}
        </div>

        <div className="nav_mobile">
          <ul>
            <li onClick={openMenuBar}>
              <FontAwesomeIcon icon={faBars} size="2x"></FontAwesomeIcon>
            </li>
          </ul>
        </div>
      </div>
      {showAlarmModal ? <AlarmModal></AlarmModal> : null}

      <Outlet></Outlet>
    </>
  );
};

export default Mainheader;
