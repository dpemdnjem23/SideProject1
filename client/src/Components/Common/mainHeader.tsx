import React, { useState } from "react";
import "../../css/common/mainHeader.css";
import MainPage from "../../Pages/MainPage";
import { Route, BrowserRouter, Link, Routes ,Outlet} from "react-router-dom";
import { useStore } from "Components/Login/Login";
//왜 tsx는 FC를 넣을까?
//

// type mypageState ={
//   disabledSignin:boolean
//   mypageOff:() =>void

//   mypageOn:() =>void
// }

const Mainheader = () => {

const {disabledSignin} = useStore()
// console.log( disabledSignin)
  //로그인(로그아웃), 메인 페이지 , 구독 모음, 개인정보(회원탈퇴), 구독 공유, 구독 달력
// console.log(disabledSignin)
  return (
    <>
    
    <div id="header">
  

        <span className="logo">

        <Link to="/">
          <img width="60" src="./images/2.png" />
          </Link>
        </span>
   
        

      <div className="main_menu">
        <ul>
          <li className="menu">
            <Link to="/">메인페이지</Link>
          </li>
          <li className="menu">
            <Link to="/wallet">구독지갑</Link>
          </li>
          <li className="menu">
            <Link to="/share">구독공유</Link>
          </li>
          <li className="menu">
            <Link to="/callendar">구독달력</Link>
          </li>
           <li className="menu">
            <Link to="/mypage"><img width='50' src='./images/wallet-6551548.svg'></img></Link>
          </li>:
          <li className="menu" >
           <Link to='/login'> 로그인</Link>
          </li>
         
          
          
        </ul>
      
        
      </div>
    
    </div>
    <Outlet></Outlet>
  </>
  );
};

export default Mainheader;
