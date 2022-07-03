import React, { useState } from "react";

import Mypagebar from "Components/Mypage/mypagebar";
import Mypageuser from "Components/Mypage/mypageuser";
import Mypagesub from "Components/Mypage/mypagesub";

import "../css/pages/Mypage.css";
import MypageEdit from "Components/Mypage/mypageuseredit";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import RegisterPage from "./Mypage/SubReigstPage";
import MypageWithdrwal from "Components/Mypage/mypageuserWithdrawal";
import { showMypageState } from "utils/state";

// type props = {
//   openRegist: () => void;
//   changeEdit: () => void;
//   deleteUser: () => void;
//   userEdit: boolean;
// };
// React.FC<props>
const MyPage = () => {

  const [showRegist, setShowRegist] = useState<boolean>(false);
 
  const openRegist = () => {
    setShowRegist(true);
  };

  const { editUser, delUser } = showMypageState()

  //가운데 메인 내정보
  //사이드 정보

  // const [paylist, setPayList] = useState<boolean>(false);

  //유저 정보 수정을 누르면 useEdit으로 바뀐다.
  return (
    <div id="Mypage">
      <div className="Mypage_background">
        <div className="Mypage_section">
          <div className="Mypage_info_section">
          {editUser||delUser?null:<Mypageuser />}
            {editUser ? <MypageEdit /> : null}
            {delUser ? <MypageWithdrwal />:null}
            {/* {paylist?<Myp} */}

            <Mypagesub openRegist={openRegist} />
          </div>
          <div className="Mypage_bar_section">
            <Mypagebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
