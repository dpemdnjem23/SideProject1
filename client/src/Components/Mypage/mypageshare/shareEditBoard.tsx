import React, { ReactElement, TextareaHTMLAttributes } from "react";
import { shareBoarduseStore, shareCarduseStore } from "utils/state";

import "../../../css/components/MyPage/MypageShare/shareregistBoard.css";

const ShareEditBoard = () => {
  //데이터를 가져온다.

  const { setShareBoard, setShareTitle } = shareBoarduseStore();

  // const onKeyPress = (area) =>{
  //   let maxLength = 100
  // }

  const { shareInfo, cardIndex, clickModalNum, setCardModal, cardModal } =
  shareCarduseStore()

  const handleTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShareTitle(e.target.value);
  };

  const handleBoard = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShareBoard(e.target.value);
  };

  // const handle

  return (
    <div className="shareregistBoard">
      <div className="shareregistBoard_title">
        <span>공유를 위한 짧은 글</span>
      </div>

      <div className="shareregistBoard_section">
        <textarea
          maxLength={20}
          placeholder="제목(20자)"
          className="shareRegistTitle"
          onChange={handleTitle}
          value={shareInfo[clickModalNum].title}
          
        ></textarea>
        <textarea
          maxLength={200}
          placeholder="왜 공유 하고싶은지 간단하게 적어주세요!(200자)"
          name="board"
          onChange={handleBoard}
          value={shareInfo[clickModalNum].description}

        ></textarea>
      </div>
    </div>
  );
};

export default ShareEditBoard;
