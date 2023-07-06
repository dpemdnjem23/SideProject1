import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/components/MyPage/mypageuser.css";
import { useNavigate } from "react-router";
import { instance } from "App";

type mypageuser = {
  subLength: number;
};
const Mypageuser: React.FC<mypageuser> = ({ subLength }) => {
  const navigate = useNavigate();

  const localstorageUserInfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || "{}"
  );
  const [nick, setNick] = useState<string>("");

  const userinfo = () => {
    instance
      .get(`/user/info`)
      .then((res) => {
        localstorageUserInfo.nickname = res.data.data.nickname;

        localStorage.setItem(
          "subgatherUserInfo",
          JSON.stringify(localstorageUserInfo)
        );

        setNick(res.data.data.nickname);
        //  console.log(userinfo)
      })
      .catch((err) => {
        navigate("/");
        // console.log(err);
      });
  };

 

  useEffect(() => {
    // walletData();
    userinfo();
  }, []);

  // const userNick:{nickname:string} = JSON.parse(localStorage.getItem('subgatherUserInfo')||'{}')
  return (
    <div className="Mypage_user">
      <img className="Mypage_user_img" src="./images/wallet-6551548.svg" />
      <div className="Mypage_user_top"></div>
      <span className="Mypage_user_text">{nick}</span>
      <span className="Mypage_user_text">구독 현황: {subLength}</span>
    </div>
  );
};
export default Mypageuser;
