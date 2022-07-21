import React, { useEffect, useState } from "react";

import Mypagebar from "Components/Mypage/mypagebar";
import Mypageuser from "Components/Mypage/mypageuser";
import Mypagesub from "Components/Mypage/mypagesub";
import moment from "moment";

import "../css/pages/Mypage.css";
import MypageEdit from "Components/Mypage/mypageuseredit";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import RegisterPage from "./Mypage/SubReigstPage";
import MypageWithdrwal from "Components/Mypage/mypageuserWithdrawal";
import { showMypageState,dateState,cycleState,registSubInfoState } from "utils/state";

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

  const {setCycle,cycle,cycleCal,setCycleCal} = cycleState()

  const {dateCal,setDateCal} =dateState()

const {setSelected,setSubCash} =  registSubInfoState()

//mypage 화면에 도달할때마다
const resetState= () =>{

setCycleCal({year:'',day:'',month:''})
setDateCal(moment())
setSelected('')
setSubCash('')

}

useEffect(()=>{

  resetState()
},[])
  

  //가운데 메인 내정보
  //사이드 정보

  // const [paylist, setPayList] = useState<boolean>(false);

  //유저 정보 수정을 누르면 useEdit으로 바뀐다.

  //페이지에 wallet 정보를 불러온다. 불러온 정보로 구독 현황, 
  // 결제일, 결제금액 갱신
  // 결제금액 -> 결제일과 매칭되는 금액
  //결제완료는 총 금액- 결제금액, 지출 액은 총금액

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
