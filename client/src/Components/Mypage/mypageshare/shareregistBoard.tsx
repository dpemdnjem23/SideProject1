import React from "react";

import "../../../css/components/MyPage/MypageShare/shareregistBoard.css";
const ShareRegistBoard = () => {
  return (
    <div id="shareregistBoard">
      <div className="shareregistBoard_title">
        <div>글 남기기</div>
      </div>

      <div className="shareregistBoard_section">
        <textarea
          placeholder="왜 공유 하고싶은지 간단하게 적어주세요!"
          name="board"
        ></textarea>
      </div>
    </div>
  );
};

export default ShareRegistBoard;
