import React from "react";
import { shareCarduseStore } from "utils/state";

import "../../css/common/modal/cardModal.css";
const CardModal = () => {
  const { shareInfo, cardIndex, clickModalNum, setCardModal } =
    shareCarduseStore();

  console.log(shareInfo[0].createdAt);

  return (
    <div id="CardModal">
      <div onClick={(e) => e.stopPropagation()} className="CardModal_section">
        <div className="CardModal_section_Xbutton">
          <button onClick={() => setCardModal(false)}>X</button>
        </div>
        <div className="CardModal_section_top">
          <div className="CardModal_section_top_section">
            <div className="CardModal_section_top_title">
              <span>{shareInfo[clickModalNum].title}</span>
            </div>
            <span>
              {`${shareInfo[clickModalNum].createdAt.substring(
                0,
                4
              )}.${shareInfo[clickModalNum].createdAt.substring(
                5,
                7
              )}.${shareInfo[clickModalNum].createdAt.substring(
                8,
                10
              )} ${shareInfo[clickModalNum].createdAt.substring(11, 16)}
              
              `}
            </span>
          </div>

          <div className="CardModal_section_top_nick">
            <div>{shareInfo[clickModalNum].user.nickname}</div>
          </div>
        </div>
        <div className="CardModal_section_center">
          <div>{shareInfo[clickModalNum].description}</div>
        </div>
        {shareInfo[clickModalNum].list_sub.list_sub.length > 0 ? (
          <div className="CardModal_section_bottom">
            <div className="CardModal_section_bottom_section">
              <div>소개하고자 하는 구독 목록</div>
            </div>

            <div className="CardModal_section_bottom_list">
              <span>
                # {shareInfo[clickModalNum].list_sub.list_sub.join(" ")}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CardModal;
