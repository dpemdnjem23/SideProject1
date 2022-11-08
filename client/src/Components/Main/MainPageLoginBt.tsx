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
const MainPageLoginBt = () => {
  
  const MainPageLoginBtRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const options = {
    root: document.querySelector(".MainPageContents1"), // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: "300px 0px 0px 0px", // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: 1, // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {

        console.log(entry) // entry is 'IntersectionObserverEntry'
      })


    }, options)


    observer.observe(MainPageLoginBtRef);


  }, [MainPageLoginBtRef, options]);

  // entry와 observer 출력

  // const button: any = document.querySelectorAll(".MainPageLoginBt");

  // button.forEach((el: any) => {
  //   io.observe(el);
  // });
  const visible = isVisible ? "zoom-in" : "";

  // io.observe(button);
  return (
    <div ref={MainPageLoginBtRef} className={`MainPageLoginBt ${visible}`}>
      <Link to="/login">
        <FontAwesomeIcon icon={faSnowflake} /> 섭개더 시작하기
      </Link>
    </div>
  );
};

export default MainPageLoginBt;
