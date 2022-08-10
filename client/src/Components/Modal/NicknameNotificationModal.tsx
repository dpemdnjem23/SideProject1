import React  , {useState} from "react";
import { mypageNotiModalState, mypageUserInfoState, showMypageState } from "utils/state";
import axios from "axios";
import "../../css/common/modal/NicknameNotificationModal.css";
import { useNavigate } from "react-router";

const NicknameNotificationModal = () => {
const {nickname} = mypageUserInfoState()

const navigate = useNavigate()
const accessToken:string|null = localStorage.getItem("accessToken")

const [nickErrMessage , setNickErrMessage] = useState<string>('')
const{setEditUser,editUser} = showMypageState()
  const userInfo: {nickname:string } = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || `{}`
  );
  const { setShowNicknameNotiModal, showNicknameNotiModal } =
    mypageNotiModalState();

  const handleNicknameNotiModal = () => {
    if (showNicknameNotiModal) {

      setShowNicknameNotiModal(false)

      
    }
    else{
      setShowNicknameNotiModal(true)
    }
    
  };

  const handleModifyNickname = () => {
    //닉네임을 체크하고, 동일한 닉네임이 없다면 변경한다.
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
      setShowNicknameNotiModal(false)
      setEditUser(false)
      navigate('/')
      //userInfo storage에 닉네임 재할당

    }).catch((err)=>{
      //
      setShowNicknameNotiModal(false)
      console.log(err)

    })
  //변경하기를 누르는 순간 => 닉네임이 동일한지 체크해야된다.

  };
  return (
    <div id="NicknameNotificationModal">
      <div className="NicknameNotificationModal_section">
        <div className="NicknameNotificationModal_title">
          <span>정말 닉네임을 변경 하시겠습니까?</span>
        </div>
        <div className="NicknameNotificationModal_contents">
          <span>
            확인을 누르면 닉네임이 변경됩니다. 원하지 않는다면 취소 버튼을
            눌러주세요
          </span>
        </div>
        <div className="NicknameNotificationModal_bt">
          <button
            onClick={handleNicknameNotiModal}
            className="NicknameNotificationModal_leftbt"
          >
            취소
          </button>
          <button onClick={handleModifyNickname} className="NicknameNotificationModal_rightbt">확인</button>
        </div>
      </div>
    </div>
  );
};

export default NicknameNotificationModal;
