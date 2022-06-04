import React, {useState} from "react";

import "../../../css/components/MyPage/MypageShare/shareregistInfo.css";

const ShareRegistInfo = () => {

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
          

      <div className="ShareRegistInfo_section_sub3">

          글쓰는곳
      </div>
    </div>
  );
};

export default ShareRegistInfo;
