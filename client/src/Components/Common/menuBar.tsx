import React, { useEffect, useState } from "react";

import {
  Route,
  BrowserRouter,
  Link,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { faBell } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";

import "../../css/common/menuBar.css";
import {
  alarmInfouseStore,
  isSigninState,
  mainheaderuseStore,
  showErrModalState,
  useWalletStore,
} from "utils/state";

const MenuBar = () => {
  const {
    showMypageModal,
    showNumber,
    mobileMyPageOn,
    mobileMyPage,
    infoNumber,
    setShowNumber,
    showMypageModalOn,
    setShowAlarmModal,
    setShowAlarmPage,
    
    
  } = mainheaderuseStore();
  const { setShowErrModal } = showErrModalState();
  const { setShowSubEdit, setShowSubDetail } = useWalletStore();
  const { userSignin } = isSigninState();
   
  const { alarmInfo, setAlarmInfo, alarmText, setAlarmText } =
    alarmInfouseStore();
  
  const navigate = useNavigate();

  const { persistLogin } = isSigninState();

  const userinfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || `{}`
  );

  const handleSignout = () => {
    fetch(`${process.env.REACT_APP_API_URI}/auth/signout`, {
      method: "get",
      credentials: "include",

      headers: {
        // "Accept" : 'application/json',
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res: any) => {
        if (!res.ok) {
          persistLogin(false);
          showMypageModalOn(false);

          localStorage.removeItem("accessToken");
          alert("로그인이 만료되었습니다. 다시 로그인해주세요");
          isSigninState.persist.clearStorage();
          localStorage.removeItem("subgatherUserInfo");

          throw new Error(res.status);
          // window.location.reload()
        }
        return res.text();
        //       // window.location.reload();
      })
      .then((res) => {
        persistLogin(false);
        showMypageModalOn(false);
        localStorage.clear();
        isSigninState.persist.clearStorage();
        mobileMyPageOn(false);

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const handleErrModal = () => {
    setShowSubDetail(false);
    setShowSubEdit(false);
    mobileMyPageOn(false);
    if (localStorage.getItem("accessToken")) {
      setShowErrModal(false);
    } else {
      navigate("/");
      setShowErrModal(true);
    }
  };

  const openAlarmPage = () =>{
    setShowAlarmModal(true)
    setShowAlarmPage(true)
    setShowNumber(false)
    mobileMyPageOn(false);

  }

  const closeMenuBar = () => {
    mobileMyPageOn(false);
    
  };
  
  let sum = 0;

  for (let i = 0; i < alarmInfo.length; i++) {
    if (alarmInfo[i].read === false) {
      sum++;
    }
  }

  return (
    <div onClick={(e) => e.stopPropagation()} id="menuBar">
      <div className="menuBarSection">
        {userSignin ? (
          <>
            <div className="menuBarSection_top2">
              <div className="menuBar2_Xbutton">
                <FontAwesomeIcon
                  onClick={openAlarmPage}
                  size="lg"
                  width="30"
                  className="menuBar2_bell"
                  icon={faBell}
                />
                {showNumber ? (
                  <div className="menuBar2_bell_number">{sum}</div>
                ) : null}
                <button onClick={closeMenuBar}>x</button>
              </div>
              <div className="menuBar2_nameSection">
                <div>{userinfo.nickname} 님</div>
                <Link onClick={() => mobileMyPageOn(false)} to="/mypage">
                  마이페이지 <FontAwesomeIcon icon={faCaretRight} />
                </Link>
              </div>

              {/* <div>이름,벨</div>
< */}
            </div>

            <div className="menuBarSection_middle">
              <div className="menuBarSection_down_main">메인메뉴</div>
            </div>

            <div className="menuBarSection_down">
              <ul className="menuBarSection_main">
                <li>
                  <Link onClick={closeMenuBar} to="/">
                    <div> 메인페이지 </div>
                    <div>
                      <FontAwesomeIcon
                        className="right_angle"
                        icon={faChevronRight}
                      ></FontAwesomeIcon>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link onClick={closeMenuBar}to="/wallet">
                    <div>구독지갑</div>

                    <div>
                      <FontAwesomeIcon
                        className="right_angle"
                        icon={faChevronRight}
                      ></FontAwesomeIcon>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link onClick={closeMenuBar} to={`/share`}>
                    <div>구독공유</div>

                    <div>
                      <FontAwesomeIcon
                        className="right_angle"
                        icon={faChevronRight}
                      ></FontAwesomeIcon>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/callendar">
                    <div>구독달력</div>
                    <div>
                      <FontAwesomeIcon
                        className="right_angle"
                        icon={faChevronRight}
                      ></FontAwesomeIcon>
                    </div>
                  </Link>
                </li>
              </ul>

              <div className="menuBarSection_middle">
                <div className="menuBarSection_down_main">고객관리</div>
              </div>
              <ul className="menuBarSection_main">
                <li>
                  <a onClick={handleSignout}>
                    <div>로그아웃</div>

                    <div>
                      <FontAwesomeIcon
                        className="right_angle"
                        icon={faChevronRight}
                      ></FontAwesomeIcon>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="menuBar_Xbutton">
              <button onClick={closeMenuBar}>x</button>
            </div>
            <div className="menuBarSection_top">
              <img className="menuBarimg" src="/images/2.png"></img>
              <span> 섭개더</span>
              {/* <div>이름,벨</div>
          < */}
            </div>

            <div className="menuBarSection_middle">
              <div className="menuBarSection_down_main">메인메뉴</div>
            </div>

            <div className="menuBarSection_down">
              <ul className="menuBarSection_main">
                <li>
                  <Link onClick={closeMenuBar} to="/">
                    <div>메인페이지</div>
                    <div>
                      <FontAwesomeIcon
                        className="right_angle"
                        icon={faChevronRight}
                      ></FontAwesomeIcon>
                    </div>
                  </Link>
                </li>
                <li onClick={handleErrModal}>
                  <Link to="/wallet">
                    <div>구독지갑</div>

                    <div>
                      <FontAwesomeIcon
                        className="right_angle"
                        icon={faChevronRight}
                      ></FontAwesomeIcon>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to={`/share`}>
                    <div>구독공유</div>

                    <div>
                      <FontAwesomeIcon
                        className="right_angle"
                        icon={faChevronRight}
                      ></FontAwesomeIcon>
                    </div>
                  </Link>
                </li>
                <li onClick={handleErrModal}>
                  <Link to="/callendar">
                    <div>구독달력</div>
                    <div>
                      <FontAwesomeIcon
                        className="right_angle"
                        icon={faChevronRight}
                      ></FontAwesomeIcon>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default MenuBar;
