import React from "react";

import "../../../css/components/MyPage/MypageShare/shareregistBoard.css";
const ShareRegistBoard = () => {
  return (
    <div className="shareregistBoard">
      <div className="shareregistBoard_title">
        <span>공유를 위한 짧은 글</span>
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
