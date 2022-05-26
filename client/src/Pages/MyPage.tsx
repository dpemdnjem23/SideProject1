import React from "react";

import Mypagebar from "Components/mypageComponent/mypagebar";
import Mypageuser from "Components/mypageComponent/mypageuser";
import Mypagesub from "Components/mypageComponent/mypagesub";

import "../css/pages/Mypage.css";
const MyPage = () => {
  //가운데 메인 내정보
  //사이드 정보
  return (
    <div id="Mypage">
      <div className="Mypage_background">
        <div className="Mypage_section">
          <div className="Mypage_info_section">
            <Mypageuser></Mypageuser>
            <Mypagesub></Mypagesub>
          </div>
          <div className="Mypage_bar_section">
            <Mypagebar></Mypagebar>
          </div>
        </div>
      </div>

      {/* <Mypagebar></Mypagebar> */}
    </div>
  );
};

export default MyPage;
