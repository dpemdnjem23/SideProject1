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

import useScrollFadeOut from "utils/hooks";

import "../../css/components/MainPage/MainPageContents2.css";
const MainPageContents2 = () => {

  // const animatedItem1: any = useScrollFadeOut(1,0.5);
  // const animatedItem2: any = useScrollFadeOut(1.5,1.5);

  const target2 = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [raise, setRaise] = useState<boolean>(false);

  const options = {
    root: document.querySelector(".MainPageContents2"), // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: "0px 0px 0px 0px", // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: 0.9, // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entries[0].isIntersecting) {
          setRaise(entry.isIntersecting);

        }
     
      });
    }, options);

    observer.observe(target2.current);
  }, [target2]);

  const on = raise?'on' : ''

  return (
    <div  className="MainPageContents2">
      <div  className="MainPageContents2_section">
        <div ref={target2} className={`MainPageContents2_section_text ${on}`}>
          {/* <div {...animatedItem1}> */}
            <p className="raise_up1 MainPageContents2_section_text_category">
              SUBSCRIPTION
            </p>
            <h2 className="raise_up1 MainPageContents2_section_text_title">
              보다 편하게 관리<br></br>구독관리
            </h2>
          {/* </div> */}

          {/* <div {...animatedItem2}> */}
            <p className="raise_up2 MainPageContents2_section_text_contents MainPageContents">
              사용하고 있는 구독명을 선택하고, <br></br> 기간, 가격을 입력하고
              등록해주세요
            </p>
          {/* </div> */}
        </div>
        <div className="MainPageContents2_section_image">
          <img className="MainPageContents2_section_image_img1 imgBack" src='/2img.png'></img>
          <img className="MainPageContents2_section_image_img2 imgBack2" src='/1img.png'></img>

        </div>
      </div>
    </div>
  );
};

export default MainPageContents2;
