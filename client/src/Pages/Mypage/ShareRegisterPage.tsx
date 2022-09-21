import CancellationButton from "Components/Common/cancellationButoon";
import RegistButton from "Components/Common/registButton";
import ShareRegistInfo from "Components/Mypage/mypageshare/shareregistInfo";
import ShareRegistBoard from "Components/Mypage/mypageshare/shareregistBoard";
import React, { useEffect } from "react";

import "../../css/pages/ShareRegisterPage.css";
import { shareBoarduseStore, shareRegisteruseStore } from "utils/state";
const ShareRegisterPage = () => {

  const {setUpdateWallet,updateWallet} = shareRegisteruseStore()
  const {shareBoard,shareTitle} = shareBoarduseStore()
  const accessToken:string |null = localStorage.getItem('accessToken')

  // useEffect(()=>{

  console.log(updateWallet)

  const handleShareRegister = () =>{

    fetch(`${process.env.REACT_APP_API_URI}/share/register`,{

      method:'POST',
      headers:{
        'Content-Type':'application/json',
        authorization:`Bearer ${accessToken}`
      },
      credentials:'include',
      body:JSON.stringify({description:shareBoard,title:shareTitle,list_sub})
    
      
    })

  }
   
  // })


  //버튼을 누르면

  return (
    <div id="ShareRegisterPage">
      <ShareRegistInfo />
      <ShareRegistBoard />

      <div className="SharRegisterPage_bt">
        <CancellationButton />

        <div onClick={handleShareRegister} className="regist_bt_section">
          <span>등록하기</span>
        </div>
      </div>
    </div>
  );
};
export default ShareRegisterPage;
