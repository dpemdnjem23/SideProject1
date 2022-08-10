



import React  , {useState} from "react";
import { mypageNotiModalState, mypageUserInfoState, showMypageState } from "utils/state";
import axios from "axios";
import "../../css/common/modal/PassNotificationModal.css";

const PassNotificationModal = () => {
const {nickname} = mypageUserInfoState()

const accessToken:string|null = localStorage.getItem("accessToken")

const{setEditUser,editUser,setPassEditUser} = showMypageState()
 
  const { showPasswordNotiModal,setShowPasswordNotilModal} =
    mypageNotiModalState();

  const handlePasseNotiModal = () => {
    if (showPasswordNotiModal) {

      setShowPasswordNotilModal(false)

      
    }
    else{
 setShowPasswordNotilModal(true) 
   }
    
  };

  const handleModifyPass = () => {
    axios.patch(
      `${process.env.REACT_APP_API_URI}/user/edit`,
      {
        nickname:nickname
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) =>{
      setShowPasswordNotilModal(false)
      setEditUser(false)
      setPassEditUser(false)
      // console.log(res.date)


    }).catch((err)=>{
      //

      setShowPasswordNotilModal(false)

    })
  //변경하기를 누르는 순간 => 닉네임이 동일한지 체크해야된다.

 

  };
  return (
    <div id="PassNotificationModal">
      <div className="PassNotificationModal_section">
        <div className="PassNotificationModal_title">
          <span>정말 비밀번호를 변경 하시겠습니까?</span>
        </div>
        <div className="PassNotificationModal_contents">
          <span>
            확인을 누르면 비밀번호가 변경됩니다. 원하지 않는다면 취소 버튼을
            눌러주세요
          </span>
        </div>
        <div className="PassNotificationModal_bt">
          <button
            onClick={handlePasseNotiModal}
            className="PassNotificationModal_leftbt"
          >
            취소
          </button>
          <button onClick={handleModifyPass} className="PassNotificationModal_rightbt">확인</button>
        </div>
      </div>
    </div>
  );
};

export default PassNotificationModal;



// fetch(`${process.env.REACT_APP_API_URI}/user/edit`, {
//     method: "post",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${accessToken}`,
//     },
//     body:JSON.stringify({
//       password:password
//     })
//   }).then((res:any)=>{
//     if(!res.ok){
//       throw new Error(res.status)
//     }
//     return res.text()
//   }).then((result)=>{

//     //성공했을경우, modal 창 띄우기
//   })