import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Route,
  BrowserRouter,
  Link,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";
import "../../css/components/MainPage/MainPageLoginBt.css";
import { faSnowflake } from "@fortawesome/free-regular-svg-icons";
import { MainPageUseStore } from "utils/state";

import "../../css/components/MainPage/MainPageContents5.css";

const MainPageContents5 = () => {
  const target = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [raise, setRaise] = useState<boolean>(false);  // const [footerLoginBt, setFooterLoginBt] = useState<boolean>(false)
  let checked= false;

  const { footerLoginBt, setFooterLoginBt, setZoomOut, setZoomIn } =
    MainPageUseStore();
  // io.observe(button);

  const options = {
    root: document.querySelector(".MainPageContents5"), // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: "0px 0px 0px 0px", // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: 0.9, // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
  };

  useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            setRaise(entries[0].isIntersecting);
            checked=entry.isIntersecting
            setFooterLoginBt(true);
            setZoomIn(true);
          
            console.log('main5',checked)


            // entry is 'IntersectionObserverEntry'
          }
          if (!entry.isIntersecting&&checked===true) {
            setRaise(entries[0].isIntersecting);
            checked=entry.isIntersecting
            setFooterLoginBt(false);
            console.log('main5 x',checked)

          }
        });
      }, options);

      observer.observe(target.current);
    

    return () => {
      console.log("나중에 언마운트됏어요");

      observer&&observer.disconnect()
    };
  }, [target]);

  const on = raise ? "on" : "";

  return (
    <div className="MainPageContents5">
      <div ref={target} className="MainPageContents5_section">
        <div className="arrow_box">원하는 대로!</div>
        <h1 className="MainPageContents5_text">
          <span className="MainPageContents5_text_1">쉽게 </span>
          <span className="MainPageContents5_text_2">확인하고, </span>
          <span className="MainPageContents5_text_1">더 </span>
          <span className="MainPageContents5_text_2">다양해진</span>
          <div className="MainPageContents5_text_1">구독을 관리해보세요</div>
        </h1>

        <div className={`MainPageLoginBt5 ${on}`}>
          <Link to="/login">
            <FontAwesomeIcon icon={faSnowflake} /> 섭개더 시작하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPageContents5;
