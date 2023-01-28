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

import "../../css/components/MainPage/MainPageMobile3.css";
const MainPageMobile3 = () => {
  const target2 = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [raise, setRaise] = useState<boolean>(false);

  const options = {
    root:null, // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: "0px 0px 0px 0px", // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: 0.7, // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
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

  const on = raise ? "on" : "";

  return (
    <div className="MainPageContents3">
      <div ref={target2} className="MainPageMobile3_section">
        <div  className={`MainPageMobile3_section_text ${on}`}>
          <p className="raise_up1 MainPageMobile3_section_text_category">
            SHARE
          </p>
          <h2 className="raise_up1 MainPageMobile3_section_text_title">
            모두와 나누세요<br className='ungiven'></br> 구독공유
          </h2>
          {/* </div> */}

          {/* <div {...animatedItem2}> */}
          <p className="raise_up2 MainPageMobile3_section_text_contents MainPageMobile">
            내가 등록한 구독들을 선택하고, <br></br> 제목, 글을 작성해주세요
          </p>
          {/* </div> */}
        </div>
        <div className={`MainPageMobile3_section_image ${on}`}>
          <img
            className="raise_up3 MainPageMobile3_section_image_img1 imgBack"
            src="/4img.png"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default MainPageMobile3;
