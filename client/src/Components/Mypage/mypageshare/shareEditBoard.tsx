import { instance } from "App";
import React, {
  ReactElement,
  TextareaHTMLAttributes,
  useState,
  useEffect,
} from "react";
import { shareBoarduseStore, shareCarduseStore } from "utils/state";
import create from "zustand";

type shareEditBoardState = {
    shareEditTitle: string;
    setShareEditTitle: (input: string) => void;
    shareEditBoard: string;
    setShareEditBoard: (input: string) => void;
    
  };
  
  
import "../../../css/components/MyPage/MypageShare/shareregistBoard.css";
const { shareInfo, cardIndex, clickModalNum, setCardModal, cardModal } =
shareCarduseStore();


export const shareEditBoardUseStore = create<shareEditBoardState>((set) => ({
    shareEditTitle: shareInfo[clickModalNum].title,
    setShareEditTitle:(input:string) => set({shareEditTitle:input}),
    shareEditBoard: shareInfo[clickModalNum].description,
    setShareEditBoard:(input:string)=>set({shareEditBoard:input})
  }));
  
 


const ShareEditBoard = () => {
  //데이터를 가져온다.

  const { setShareBoard, setShareTitle } = shareBoarduseStore();

  // const onKeyPress = (area) =>{
  //   let maxLength = 100
  // }


  const [data, setData] = useState(shareInfo[clickModalNum].description);

  useEffect(() => {
    instance
      .get(`/share/info`, {})

      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
