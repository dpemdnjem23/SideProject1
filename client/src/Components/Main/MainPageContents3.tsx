import React, { useState, useEffect ,useRef} from "react";
// import 
import {
  Route,
  BrowserRouter,
  Link,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";

import "../../css/components/MainPage/MainPageContents3.css"
const MainPageContents3 = () =>{


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
        if (!entries[0].isIntersecting) {
          setRaise(entry.isIntersecting);

          // entry is 'IntersectionObserverEntry'
        }
      });
    }, options);

    observer.observe(target2.current);
  }, [target2]);

  const on = raise?'on' : ''



  return (
    <div  className="MainPageContents3">
      <div  className="MainPageContents3_section">
        <div ref={target2} className={`MainPageContents3_section_text ${on}`}>
          {/* <div {...animatedItem1}> */}
            <p className="raise_up1 MainPageContents3_section_text_category">
              SHARE
            </p>
            <h2 className="raise_up1 MainPageContents3_section_text_title">
              모두와 나누세요<br></br>구독공유
            </h2>
          {/* </div> */}

          {/* <div {...animatedItem2}> */}
            <p className="raise_up2 MainPageContents3_section_text_contents MainPageContents">
              내가 등록한 구독들을 선택하고, <br></br> 제목,글을 작성해주세요
            </p>
          {/* </div> */}
        </div>
        <div className="MainPageContents3_section_image"></div>
      </div>
    </div>
  )
}

export default MainPageContents3

