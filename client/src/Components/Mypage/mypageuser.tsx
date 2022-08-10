import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/components/MyPage/mypageuser.css";
import { useNavigate } from "react-router";


type mypageuser={

  subLength:number

}
const Mypageuser:React.FC<mypageuser> = ({subLength}) => {
  const navigate = useNavigate();

  const accessToken: string | null = localStorage.getItem("accessToken");

  const [nick, setNick] = useState<string>("");

  const userinfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/user/info`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const userinfo = JSON.parse(
          localStorage.getItem("subgatherUserInfo") || `{}`
        );
        userinfo.nickname = res.data.data.nickname;

        localStorage.setItem("subgatherUserInfo", JSON.stringify(userinfo));

        setNick(res.data.data.nickname);
        //  console.log(userinfo)
      })
      .catch((err) => {
        navigate("/");
        console.log(err);
      });
  };

  // const walletData = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URI}/wallet/info`, {
  //       headers: {
  //         authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((res) => {
     
  //       //  console.log(userinfo)
  //     })
  //     .catch((err) => {
  //       navigate("/");
  //       console.log(err);
  //     });
  // };

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
