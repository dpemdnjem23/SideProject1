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

  const [scroll, setScroll] = useState(false);


  const {
    visible,
    setVisible,
    zoomIn,
    zoomOut,
    setZoomIn,
    setZoomOut,
    setFooterLoginBt,
    footerLoginBt,
  } = MainPageUseStore();

  const options = {
    root: null, // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: "0px 0px 0px 0px", // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: 0.9, // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
  };
  let checked= false;

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     console.log('clean up')
  //     window.removeEventListener('scroll', handleScroll); //clean up
  //   };
  // }, []);

  const handleScroll = () => {
    // 스크롤이 Top에서 50px 이상 내려오면 true값을 useState에 넣어줌
    if (window.scrollY >= 50) {
      setScroll(true);
      console.log(scroll);
    } else {
      // 스크롤이 50px 미만일경우 false를 넣어줌
      setScroll(false);
    }
  };

  useEffect(() => {


    

    const observer = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {
        if (entry.isIntersecting&&checked===true) {
          console.log('main1')
          //zustand 변수들이 적용이 되고 intersection observer는 처음 설정그대로 console에 찍힌다.

          // if (checked === true) {
          setZoomIn(entry.isIntersecting);
          setFooterLoginBt(true);
          setZoomOut(entry.isIntersecting);
          console.log(checked)
          checked=false
        

          // }

          // setZoomOut(entry.isIntersecting);
          // entry is 'IntersectionObserverEntry'
        }

        if (!entry.isIntersecting) {
          setZoomIn(false);
          checked=true
          setFooterLoginBt(entry.isIntersecting);


          setZoomOut(entry.isIntersecting);
          // observer.unobserve(target.current)
console.log('main1 false',checked)
          // entry is 'IntersectionObserverEntry'
        }
      });
    }, options);

      observer.observe(target.current);

    


    // return () =>{
    //   observer.unobserve()
    // }
    return () => {
      // console.log("나중에 언마운트됏어요");
       observer.disconnect();
    };
  }, [target]);


  // entry와 observer 출력

  // const button: any = document.querySelectorAll(".MainPageLoginBt");

  // button.forEach((el: any) => {
  //   io.observe(el);
  // });
  // const visible = isVisible ? "zoom-in" : "";

  return (
    <div className="MainPageContents1">
      <div ref={target} className="MainPageContents1_section">
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
