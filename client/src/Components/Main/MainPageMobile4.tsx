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

import "../../css/components/MainPage/MainPageMobile4.css"
const MainPageMobile4 = () =>{


  const target2 = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [raise, setRaise] = useState<boolean>(false);

  const options = {
    root: null, // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
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

    return ()=>{
        observer && observer.disconnect()
    }
  }, [target2]);

  const on = raise?'on' : ''



  return (
    <div  className="MainPageContents4">
      <div  className="MainPageMobile4_section">
        <div ref={target2} className={`MainPageMobile4_section_text ${on}`}>
          {/* <div {...animatedItem1}> */}
            <p className="raise_up1 MainPageMobile4_section_text_category">
              CALLENDAR
            </p>
            <h2 className="raise_up1 MainPageMobile4_section_text_title">
              한눈에 확인 하는 <br className='MainPageMobile4_ungiven'></br>구독달력
            </h2>
          {/* </div> */}

          {/* <div {...animatedItem2}> */}
            <p className="raise_up2 MainPageMobile4_section_text_contents MainPageContents">
             구독을 월별로 확인하고,<br></br>자유롭게 날짜를 정해보세요!
            </p>
          {/* </div> */}
        </div>
        <div className={`MainPageMobile4_section_image ${on}`}>

        <img
            className="raise_up3 MainPageMobile4_section_image_img1 imgBack"
            src="/5img.png"
          ></img>
        </div>
      </div>
    </div>
  )
}
export default MainPageMobile4