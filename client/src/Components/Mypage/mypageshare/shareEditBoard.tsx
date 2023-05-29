import { instance } from "App";
import React, {
  ReactElement,
  TextareaHTMLAttributes,
  useState,
  useEffect,
} from "react";
import {  shareCarduseStore, shareEditUseStore } from "utils/state";
import create from "zustand";
// const { shareInfo, cardIndex, clickModalNum, setCardModal, cardModal } =
//   shareCarduseStore();


import "../../../css/components/MyPage/MypageShare/shareregistBoard.css";

const ShareEditBoard = () => {
  //데이터를 가져온다.

  const share = JSON.parse(localStorage.getItem("share") || "{}");

  const {
    setShareEditBoard,
    setShareEditTitle,
    shareEditBoard,
    shareEditTitle,
    
  } = shareEditUseStore()
  // const onKeyPress = (area) =>{
  //   let maxLength = 100
  // }

  useEffect(() => {
    setShareEditBoard(share.description);
    setShareEditTitle(share.title);
  }, []);

  const handleTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShareEditTitle(e.target.value);
  };

  const handleBoard = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShareEditBoard(e.target.value);
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
          value={shareEditTitle}
        ></textarea>
        <textarea
          maxLength={200}
          placeholder="왜 공유 하고싶은지 간단하게 적어주세요!(200자)"
          name="board"
          onChange={handleBoard}
          value={shareEditBoard}
        ></textarea>
      </div>
    </div>
  );
};

export default ShareEditBoard;
