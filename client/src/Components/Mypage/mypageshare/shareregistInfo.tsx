import React, {useState} from "react";

import "../../../css/components/MyPage/MypageShare/shareregistInfo.css";

const ShareRegistInfo = () => {

  //구독 정보 를 불러모으는 버튼이 있다.
  // 버튼을 누를시 구독정보를 불러오고 불러오는동안 대기화면 표시
  // 구독정보를 불러오고 싶지 않을수 있으니 버튼을 누르지 않으면 그냥 글만 쓸수 있다
  // 이를 안내할만한 것들을 모달창을 띄우든 버튼 클릭시 안내가 필요하다.

    const [button, setButton] = useState(true);


    const importData =() =>{

        setButton(false)

        

    }
  return (
    <div className="ShareRegistInfo_section">
      <div className="ShareRegistInfo_section_sub">
        <span className="ShareRegistInfo_section_title">구독 공유하기</span>

        <p className="ShareRegistInfo_section_title2">
          구독 공유를 위해 나의 구독 정보를 모으고, 글을 남겨주세요!
        </p>
      </div>
     
      <div className="ShareRegistInfo_section_sub2">
      {button?
        <div className='ShareRegistInfo_bt_section'>
          <div onClick = {importData}>버튼</div>
        </div>
        :
        <div>
        <div>넷플릭스 
            \n
            넷플릭스
        </div>
          <div>넷플릭스</div>
           <div>넷플릭스</div>
           <div>넷플릭스</div>
           <div>넷플릭스</div>
           <div>넷플릭스</div>
           <div>넷플릭스</div>
           <div>넷플릭스</div>
           <div>넷플릭스</div>
           <div>넷플릭스</div>
           <div>넷플릭스</div>
           <div>넷플릭스</div>
           <div>넷플릭스</div>
      <div>넷플릭스</div>
           <div>넷플릭스</div>
           <div>넷플릭스</div>
           <div>넷플릭스</div>

        </div>

      }
      </div>
        
    </div>
  );
};

export default ShareRegistInfo;
