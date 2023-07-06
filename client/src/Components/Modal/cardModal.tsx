import { instance } from "App";
import React, { useEffect } from "react";
import { shareCarduseStore } from "utils/state";
import { Link } from "react-router-dom";

import "../../css/common/modal/cardModal.css";
const CardModal = () => {
  const { shareInfo, cardIndex, clickModalNum, setCardModal, cardModal } =
    shareCarduseStore();

  const userinfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || "{}"
  );

  const closeCardModal = () => {
    setCardModal(false);
  };

  const handleDelete = () => {
    instance
      .delete("/share/delete", {
        data: {
          id: cardIndex,
        },
      })
      .then((res) => {
        setCardModal(false);
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const handleEdit = () => {
    //수정으로 옮기고 옮기는 대신 데이터를
    //그대로 갖다 놓는다.
    localStorage.setItem("share", JSON.stringify(shareInfo[clickModalNum]));
  };
  //모바일 일때만 적용한다.
  useEffect(() => {
    // 모달 열릴 때 body에 overflow: hidden 스타일 추가
    document.body.style.overflow = "hidden";

    // 모달 닫힐 때 body에 overflow: auto 스타일 복원
    return () => {
      document.body.style.overflow = "";
    };
  }, [cardModal]);

  return (
    <div onClick={closeCardModal} id="CardModal">
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
            {shareInfo[clickModalNum].user_id === userinfo.id ? (
              <div className="CardModal_section_top_btsec">
                <button onClick={handleDelete}>삭 제</button>
                {/* <button> */}
                <Link onClick={handleEdit} to="/shareedit">
                  <button>수 정</button>
                </Link>
                {/* </button> */}
              </div>
            ) : null}
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
