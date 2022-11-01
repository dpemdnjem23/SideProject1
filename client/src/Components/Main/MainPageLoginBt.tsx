import React, { useState, useEffect } from "react";
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
  const options = {
    root: null, // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: "0px", // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: 1 // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
  };

  const io = new IntersectionObserver((entries, observer) => {
      // entry와 observer 출력
      entries.forEach((entry) => {

        if(entry.isIntersecting){
console.log(entry.isIntersecting)
            entry.target.classList.add("zoom-in")
          
        }
        else{

          // entry.target.classList.remove('MainPageLoginBt')
            entry.target.classList.add('zoom-out')
        }
      
        
      });
  }, options);

  const button:any = document.querySelectorAll('.MainPageLoginBt')

  button.forEach((el:any)=>{
    io.observe(el)
  })

  // io.observe(button)

    // io.observe(button);
     return (
    <div className="MainPageLoginBt">
      <Link to="/login">
        <FontAwesomeIcon icon={faSnowflake} /> 섭개더 시작하기
      </Link>
    </div>
  );
};

export default MainPageLoginBt;
