import React from "react";
import { shareCarduseStore } from "utils/state";

import "../../css/common/modal/cardModal.css";
const CardModal = () => {
  const { shareInfo, cardIndex, clickModalNum, setCardModal } =
    shareCarduseStore();

  console.log(shareInfo[clickModalNum].list_sub);

  return (
    <div id="CardModal">
      <div onClick={(e) => e.stopPropagation()} className="CardModal_section">
        <div className="CardModal_section_Xbutton">
          <button onClick={() => setCardModal(false)}>X</button>
        </div>
        <div className="CardModal_section_top">
          <div className="CardModal_section_top_title">
            {shareInfo[clickModalNum].title}
          </div>
          <div className="CardModal_section_top_nick">
            작성자: {shareInfo[clickModalNum].user.nickname}
          </div>
        </div>
        <div className="CardModal_section_center">
          <div>{shareInfo[clickModalNum].description}</div>
        </div>
        <div>
          <div>{shareInfo[clickModalNum].list_sub}</div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
