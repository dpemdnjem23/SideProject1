import React, { useState, useEffect, useRef } from "react";
// import
import {
  Route,
  BrowserRouter,
  Link,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {useScrollFadeOut} from "@/hooks";

import "../../css/components/MainPage/MainPageContents2.css";
const MainPageContents2 = () => {

  const animatedItem = useScrollFadeOut()
  // const animatedItem = useScrollFadeOut
  const target2 = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [raise, setRaise] = useState<boolean>(false);

  const options = {
    root: document.querySelector('.MainPageContents2'), // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: "0px 0px 0px 0px", // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: 0, // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entries[0].isIntersecting) {
          setRaise(entry.isIntersecting);

          console.log(entries[0].isIntersecting); // entry is 'IntersectionObserverEntry'
        }
        if (!entries[0].isIntersecting) {
          setRaise(entry.isIntersecting);
          console.log(entries[0].isIntersecting); // entry is 'IntersectionObserverEntry'

          // entry is 'IntersectionObserverEntry'
        }
      });
    }, options);

    observer.observe(target2.current);
  }, [target2]);


  return (
    <div  className="MainPageContents2">
      <div {...animatedItem} className="MainPageContents2_section">
        <div className="MainPageContents2_section_text">
          <p className="MainPageContents2_section_text_category raise_up1">
            SUBSCRIPTION
          </p>
          <h2 className="MainPageContents2_section_text_title raise_up1">
            보다 편하게 관리<br></br>구독관리
          </h2>
          <p className="MainPageContents2_section_text_contents MainPageContents raise_up2">
            사용하고 있는 구독명을 선택하고, <br></br> 기간, 가격을 입력하고
            등록해주세요
          </p>
        </div>
        <div className="MainPageContents2_section_image"></div>
      </div>
    </div>
  );
};

export default MainPageContents2;
