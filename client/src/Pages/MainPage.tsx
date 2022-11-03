import React, { useState } from "react";
import {Routes, BrowserRouter, Link } from "react-router-dom";
import MainPageContents1 from "Components/Main/MainPageContents1";
import MainPageSlickList from "Components/Main/MainPageSlickList";
import BottomBar from "Components/Common/footer";

import '../css/pages/MainPage.css'
import MainPageLoginBt from "Components/Main/MainPageLoginBt";
import MainPageContents2 from "Components/Main/MainPageContents2";
import MainPageBoundary from "Components/Main/MainPageBoundary";
import MainPageContents3 from "Components/Main/MainPageContents3";
import MainPageContents4 from "Components/Main/MainPageContents4";
const MainPage = () => {


  const options = {
    root: null, // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: "1000px 0px 0px 0px", // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: 1 // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
  };

  const io = new IntersectionObserver((entries, observer) => {
    // entry와 observer 출력
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(entry.target,'true');
        entry.target.classList.add("zoom-in");
        observer.unobserve(entry.target);

      } else {
        console.log(entry.target,'fail');
        observer.unobserve(entry.target);


              
        // entry.target.classList.remove('MainPageLoginBt')
        entry.target.classList.remove("zoom-in");
      }
    });
  }, options);

  const button: any = document.querySelectorAll(".MainPageContents1");

  button.forEach((el: any) => {
    io.observe(el);
  });

  return (

    
    <div className="App_MainContents">
    <MainPageContents1></MainPageContents1>
    <MainPageSlickList></MainPageSlickList>
    <MainPageLoginBt></MainPageLoginBt>
    <MainPageContents2></MainPageContents2>
    <MainPageBoundary></MainPageBoundary>
    <MainPageContents3></MainPageContents3>
    <MainPageBoundary></MainPageBoundary>
    <MainPageContents4></MainPageContents4>

    <BottomBar></BottomBar>

  </div>
  )
};

export default MainPage;
