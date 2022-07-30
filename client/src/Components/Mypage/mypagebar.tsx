import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { accessToken, showMypageState } from "utils/state";
import "../../css/components/MyPage/mypagebar.css";

// const s = document.getElemnetsByClassName()

const Mypagebar = () => {
  //

  //한번더 클릭하면 원래대로 돌아가야한다.
  const { setDelUser, setEditUser, editUser, delUser } = showMypageState();
// const {paymentDay , setPaymentDay}  = useState<number>(0)
const [cash , setCash] = useState<number>(0)
  const handleEditUser = () => {
    //마이페이지에서 같은 걸 한번더 클릭하면 원래대로 돌아오도록 한다.
    if (editUser === true) {
      setEditUser(false);
      setDelUser(false);
    } else {
      setEditUser(true);
      setDelUser(false);
    }
  };

  const handleDelUser = () => {
    //마이페이지에서 같은 걸 한번더 클릭하면 원래대로 돌아오도록 한다.
    if (delUser === true) {
      setDelUser(false);
      setEditUser(false);
    } else {
      setDelUser(true);
      setEditUser(false);
    }
  };

  const paymentManagement =() =>{
    //결제일과 결제금액 => 
    
    //가장 적게남은 결제일 의 결제금액의 합을 보여준다

    axios.get(`${process.env.REACT_APP_API_URI}/wallet/walletinfo`,{
      headers:{
        authorization : `Bearer ${accessToken}`

      },
      withCredentials:true
    }).then((res)=>{
      //start_date+cycle cycle은 cycle 주기마다 cycle을 더해야한다
      //그러면 today가 end_date(start+cycle)에 도달했을때 
      //start_date 를 end_date로 바꾸고 다시 end_date를 정한다.

      console.log(res.data)

    }).catch((err)=>{
      console.log(err)
    })

    // fetch(`${process.env.REACT_APP_API_URI}/wallet/walletinfo`,{
    //   method:'get',
    //   credentials:'include',
    //   headers:{
    //     authorization : `Bearer ${accessToken}`

    //   }
    // })
    // .then((res:any)=>{

    //   if(!res.ok){
    //     throw new Error(res.status)
    //   }


    //   return res.json()

    // }).then((result)=>{
    //   console.log(result)


    // })
    // .catch((err)=>{
    //   console.log(err)
    // })

  }

  useEffect(()=>{
paymentManagement()

  },[])
// const subscribeManagement = () =>{
// console.log('s')
// }


  //현재 결제가 남은 구독갯수

  //top에는 결제일이 3일남앗다 3일남은 구독이 몇갡지
  //bottom에는 개인정보 수정 / 구독
  //center에는 남은 결제액 / 총액수

  //span의 변화가 일어나면 위쪽의 css도변화를 준다.

  //회원 정보수정을 누르면 메인 화면이 변한다.
  //섭개더 구독결제 현황을 누르면 메인화면이 변하고 결제내역을 보여준다.
  return (
    <>
      <div className="Mypage_bar_top container">
        <div className="Mypage_bar_top title">결제 현황 관리</div>
        <div className="Mypage_bar_top_section">
          <div className="Mypage_bar_top_section1">
            <span className="Mypage_bar_top_section1_days">결제일 </span>
            <br></br>
            <span className="Mypage_bar_top_section1_day">13 일</span>

            {/* <span className="Mypage_bar_top_section1_pay2">결제 금액</span>
             */}
          </div>

          <div className="Mypage_bar_top_section2">
            <br></br>
            <span className="Mypage_bar_top_section2_slash">/</span>
          </div>
          <div className="Mypage_bar_top_section3">
            <span className="Mypage_bar_top_section1_pay">결제금액</span>
            <br></br>

            <span className="Mypage_bar_top_section2_pay"> {cash} 원</span>
          </div>
        </div>
        {/* <span>3-days / 2 (결제금액)</span> */}
      </div>
      <div className="Mypage_bar_gap"></div>
      <div className="Mypage_bar_center container">
        <div className="Mypage_bar_center title">구독 정산 관리</div>
        <div className="Mypage_bar_center_section">
          <div className="Mypage_bar_center_section1">
            <span className="Mypage_bar_center_section1_comp">결제 완료</span>
            <br></br>

            <div className="Mypage_bar_center_section1_comp2">500원</div>
          </div>

          <div className="Mypage_bar_center_section2">
            <br></br>
            <span className="Mypage_bar_center_section2_slash">/</span>
          </div>
          <div className="Mypage_bar_center_section3">
            <span className="Mypage_bar_center_section1_pay">지출 총액</span>
            <br></br>

            <span className="Mypage_bar_center_section1_pay2">854원</span>
          </div>
        </div>
        <div className="Mypage_bar_gap"></div>
      </div>
      <div className="Mypage_bar_gap"></div>
      <div className="Mypage_bar_bottom container">
        <div className="Mypage_bar_bottom title">섭개더 관리</div>
        <div className=" Mypage_bar_bottom_section">
          <div onClick={handleEditUser}>회원 정보 수정</div>
          <div onClick={handleDelUser}>회원탈퇴</div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Mypagebar;
