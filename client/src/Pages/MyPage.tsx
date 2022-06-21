import React, { useState } from "react";

import Mypagebar from "Components/mypage/mypagebar";
import Mypageuser from "Components/mypage/mypageuser";
import Mypagesub from "Components/mypage/mypagesub";

import "../css/pages/Mypage.css";
import MypageEdit from "Components/mypage/mypageuseredit";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import RegisterPage from "./Mypage/SubReigstPage";

type props = {
  openRegist: () => void;
  changeEdit: () => void;
  deleteUser: () => void;
  userEdit: boolean;
};

const MyPage: React.FC<props> = ({
  userEdit,
  openRegist,
  changeEdit,
  deleteUser,
}) => {
  //가운데 메인 내정보
  //사이드 정보

  // const [paylist, setPayList] = useState<boolean>(false);

  //유저 정보 수정을 누르면 useEdit으로 바뀐다.
  return (
    <div id="Mypage">
      <div className="Mypage_background">
        <div className="Mypage_section">
          <div className="Mypage_info_section">
            {userEdit ? <MypageEdit /> : <Mypageuser />}
            {/* {paylist?<Myp} */}

            <Mypagesub openRegist={openRegist} />
          </div>
          <div className="Mypage_bar_section">
            <Mypagebar changeEdit={changeEdit} deleteUser={deleteUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
