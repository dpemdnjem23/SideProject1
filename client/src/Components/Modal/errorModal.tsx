import React from "react";
import { Link } from "react-router-dom";
import { showErrModalState } from "utils/state";

import "../../css/common/modal/errModal.css";
const ErrModal = () => {

    const {setShowErrModal} = showErrModalState()
//로그인 or 회원가입을 누르거나 바깥 클릭하면 모달창 닫힘

  //액세스 토큰없이 진입할 경우 로그인 창으로 이동후 안내 모달

  return (
    <div onClick = {()=>setShowErrModal(false)}id="errModal">
      <div onClick = {(e)=>e.stopPropagation()}className="errModal_section">
        <div className="errModal_text">
          로그인을 하시면
          <br></br>
          subgather를
          <br></br>
          이용하실수 있습니다.
        </div>

        <div className='errModal_btn'>
            <Link to='/signup' >
          <button onClick= {()=>setShowErrModal(false)} >회원가입</button>
          </Link>

          <Link to='/login' >

          <button onClick= {()=>setShowErrModal(false)} >로그인</button>
          </Link>


        </div>
      </div>
    </div>
  );
};

export default ErrModal;
