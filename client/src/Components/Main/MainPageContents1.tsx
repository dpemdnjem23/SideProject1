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
import { MainPageUseStore } from "utils/state";
import "../../css/components/MainPage/MainPageContents1.css";
const MainPageContents1 = () => {
  const target = useRef() as React.MutableRefObject<HTMLDivElement>;

  // const [vistble,set]

  const { visible, setVisible } = MainPageUseStore();

  const options = {
    root: null, // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: "0px 0px 0px 0px", // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: 0.9, // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entries[0].isIntersecting) {
          setVisible(entry.isIntersecting);
       // entry is 'IntersectionObserverEntry'
        }
        if (!entries[0].isIntersecting) {
          setVisible(entry.isIntersecting);
          // observer.unobserve(target.current)


          // entry is 'IntersectionObserverEntry'
        }
      });
    }, options);

    observer.observe(target.current);


    return () => observer && observer.disconnect();

  }, [target]);

  // entry와 observer 출력

  // const button: any = document.querySelectorAll(".MainPageLoginBt");

  // button.forEach((el: any) => {
  //   io.observe(el);
  // });
  // const visible = isVisible ? "zoom-in" : "";

  return (
    <div ref={target} className="MainPageContents1">
      <div className="MainPageContents1_section">
        <div className="MainPageCotents1_text">
          <div>
            <p className="MainPageContents1_section_p">
              더 쉽게 구독관리를 해보세요, <br></br>구독관리는<br></br>{" "}
              섭개더에서 해보세요
            </p>
            <p className="MainPageContents1_section_p2">
              정리하기 귀찮으셨다면,<br></br> 생활속 구독들을 만나보세요
            </p>
            <div className="MainPageContents1_bt_section">
              <Link to="/login">섭개더 시작하기</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageContents1;
