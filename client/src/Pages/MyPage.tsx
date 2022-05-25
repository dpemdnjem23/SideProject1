import React from "react";

import Mypagebar from "Components/mypageComponent/mypagebar";
import Mypageinfo from "Components/mypageComponent/mypageinfo";
import Mypagesub from "Components/mypageComponent/mypagesub";

import "../css/pages/Mypage.css";
const MyPage = () => {
  //가운데 메인 내정보
  //사이드 정보
  return (
    <div id="Mypage">
      <div className="Mypage_section">
        <div className="Mypage_info_section">
          <Mypageinfo></Mypageinfo>

          <Mypagesub></Mypagesub>
        </div>
        <div className="Mypage_bar_section">
          <Mypagebar></Mypagebar>
        </div>
      </div>

      {/* <Mypagebar></Mypagebar> */}
    </div>
  );
};

export default MyPage;
