import CancellationButton from "Components/Common/cancellationButoon";
import RegistButton from "Components/Common/registButton";
import ShareRegistInfo from "Components/Mypage/mypageshare/shareregistInfo";
import ShareRegistBoard from "Components/Mypage/mypageshare/shareregistBoard";
import React, { useEffect } from "react";

import "../../css/pages/ShareRegisterPage.css";
import { shareBoarduseStore, shareRegisteruseStore } from "utils/state";
import { useNavigate } from "react-router";
const ShareRegisterPage = () => {
  const { setUpdateWallet, updateWallet } = shareRegisteruseStore();
  const { shareBoard, shareTitle } = shareBoarduseStore();
  const accessToken: string | null = localStorage.getItem("accessToken");

  // useEffect(()=>{

  const navigate = useNavigate();

  // console.log(shareBoard,shareTitle,updateWallet)

  const handleShareRegister = () => {
    fetch(`${process.env.REACT_APP_API_URI}/share/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({
        description: shareBoard,
        title: shareTitle,
        list_sub: updateWallet,
      }),
    })
      .then((res: any) => {

        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.text();
      })
      .then((result) => {

        console.log(result);

        navigate("/share");
      })
      .catch((err) => {
        alert("제목과 글을 입력해주세요");
        console.log(err);
      });
  };

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
