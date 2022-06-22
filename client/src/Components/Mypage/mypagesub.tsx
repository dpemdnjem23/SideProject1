import React, { useState } from "react";
import { Route, BrowserRouter, Link, Routes } from "react-router-dom";

import "../../css/components/MyPage/mypagesub.css";

type props =  {
  openRegist: () => void;
}

const Mypagesub: React.FC<props> = ({ openRegist }) => {
  // const [showRegist, setShowRegist] = useState<boolean>(false);

  return (
    <>
      {/* // <div className='Mypage_sub_section'> */}
      <div className="Mypage_sub_text">나의 구독</div>
      <div className="Mypage_sub_section">
        <Link to="/subregist">
          <div onClick={() => openRegist()} className="Mypage_1 sub">
            <div className="Mypage_1 textarea">
              <span className="text_top">구독 등록</span>
              <span className="text_middle">나만의 구독을 등록해주세요!</span>
              <div className="text_regist1 bottom">
                구독 등록
                <img src="./images/icons8-들어가다-30.png"></img>
              </div>
            </div>
          </div>
        </Link>
        <div className="Mypage_2 sub">
        <Link to="/shareregist">
          <div className="Mypage_2 textarea">
            <span className="text_top">구독 모음</span>
            <span className="text_middle">나의 구독을 글과 함께 공유해요!</span>
            <div className="text_regist2 bottom">
              구독 모음
              <img src="./images/icons8-들어가다-30.png"></img>
            </div>
          </div>
          </Link>
        </div>
     
      </div>
 
      {/* // </div> */}
    </>
  );
};

export default Mypagesub;
