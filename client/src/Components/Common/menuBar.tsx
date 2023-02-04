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
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "../../css/common/menuBar.css";
import XButton from "./XButton";
import {
  isSigninState,
  mainheaderuseStore,
  showErrModalState,
  useWalletStore,
} from "utils/state";

const MenuBar = () => {
  const { showMypageModal, showNumber,mobileMyPageOn, mobileMyPage, showMypageModalOn } =
    mainheaderuseStore();
  const { setShowErrModal } = showErrModalState();
  const { setShowSubEdit, setShowSubDetail } = useWalletStore();
  const { userSignin } = isSigninState();
  const closeMenuBar = () => {
    mobileMyPageOn(false);
    console.log("asd");
  };
  const navigate = useNavigate();

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

  return (
    <div onClick={(e) => e.stopPropagation()} id="menuBar">
      <div className="menuBarSection">
        {userSignin ? (
          <>
            <div className="menuBarSection_top2">
              <div className="menuBar2_Xbutton">
                <FontAwesomeIcon
                  // onClick={openAlarmModal}
                  size='lg'
                  width="60"
                  className="menuBar2_bell"
                  icon={faBell}
                />
                 {showNumber ? (
                    <div className="menu_bell_number">{sum}</div>
                  ) : null}
                <button onClick={closeMenuBar}>x</button>
              </div>
              <div>이름</div>
              <div>아이디</div>

              {/* <div>이름,벨</div>
< */}
            </div>

            <div className="menuBarSection_middle">
              <div className="menuBarSection_down_main">메인메뉴</div>
            </div>

            <div className="menuBarSection_down">
              <ul className="menuBarSection_main">
                <li>
                  <div>
                    <Link to="/">메인페이지</Link>

                    <FontAwesomeIcon
                      className="right_angle"
                      icon={faChevronRight}
                    ></FontAwesomeIcon>
                  </div>
                </li>
                <li>
                  <div onClick={handleErrModal}>
                    <Link to="/wallet">구독지갑</Link>

                    <FontAwesomeIcon
                      className="right_angle"
                      icon={faChevronRight}
                    ></FontAwesomeIcon>
                  </div>
                </li>
                <li>
                  <div>
                    <Link to={`/share`}>구독공유</Link>

                    <FontAwesomeIcon
                      className="right_angle"
                      icon={faChevronRight}
                    ></FontAwesomeIcon>
                  </div>
                </li>
                <li>
                  <div onClick={handleErrModal}>
                    <Link to="/callendar">구독달력</Link>

                    <FontAwesomeIcon
                      className="right_angle"
                      icon={faChevronRight}
                    ></FontAwesomeIcon>
                  </div>
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
                  <div>
                    <Link to="/">메인페이지</Link>

                    <FontAwesomeIcon
                      className="right_angle"
                      icon={faChevronRight}
                    ></FontAwesomeIcon>
                  </div>
                </li>
                <li>
                  <div onClick={handleErrModal}>
                    <Link to="/wallet">구독지갑</Link>

                    <FontAwesomeIcon
                      className="right_angle"
                      icon={faChevronRight}
                    ></FontAwesomeIcon>
                  </div>
                </li>
                <li>
                  <div>
                    <Link to={`/share`}>구독공유</Link>

                    <FontAwesomeIcon
                      className="right_angle"
                      icon={faChevronRight}
                    ></FontAwesomeIcon>
                  </div>
                </li>
                <li>
                  <div onClick={handleErrModal}>
                    <Link to="/callendar">구독달력</Link>

                    <FontAwesomeIcon
                      className="right_angle"
                      icon={faChevronRight}
                    ></FontAwesomeIcon>
                  </div>
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