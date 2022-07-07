import React,{useState} from "react";

import "../../css/components/MyPage/mypageuser.css";


const Mypageuser = () => {

  const [userEdit, setUsetEdit] = useState(false)

  const changeUserEdit = () =>{
    setUsetEdit(true)
  }
  const userNick:{nickname:string} = JSON.parse(localStorage.getItem('subgatherUserInfo')||'{}')
  console.log(userNick.nickname)
  return (

   
      <div className="Mypage_user">
        <img className="Mypage_user_img" src="./images/wallet-6551548.svg" />
        <div className="Mypage_user_top"></div>
        <span className="Mypage_user_text">{userNick.nickname}</span>
        <span className="Mypage_user_text">구독 현황: 15</span>
      </div>
    
  );
};
export default Mypageuser;
