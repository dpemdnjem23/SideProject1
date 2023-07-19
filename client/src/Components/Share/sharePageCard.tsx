import { instance } from "App";
import axios from "axios";
import Loading from "Components/Common/loading";
import React, { useState, useEffect } from "react";
import { paginationuseStore, shareCarduseStore } from "utils/state";

import "../../css/components/SharePage/shareCard.css";

const ShareCard = () => {
  const { page } = paginationuseStore();
  const {
    setShareInfo,
    setLoading,
    shareInfo,
    setCardIndex,
    setClickModalNum,
    setCardModal,
    loading,
  } = shareCarduseStore();
  const limit = 6;
  const offset = (page - 1) * limit;

  const openCardModal = (index: number, el: number) => {
    setCardIndex(el);
    setClickModalNum(index);
    setCardModal(true);
  };

  useEffect(() => {
    //에러로 안가네? 에러로 보내는 법
    setLoading(true);
    instance
      .get(`/share/info`, {
        params: { page: page },
      })
      .then((res) => {
        setShareInfo(res.data.shareInfo);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  // setLoading(false)

  // console.log(shareInfo[0].list_sub.list_sub.join(' '))

  // background-color: rgb(247, 249, 250);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="ShareCard">
          {shareInfo.slice(0, limit).map((el, index) => {
            return (
              <div onClick={() => openCardModal(index, el.id)} key={el.id}>
                <div className="ShareCard_title">{el.title}</div>
                <div className="ShareCard_text">
                  {el.description.substr(0, 37) + "..."}
                </div>
                <div className="ShareCard_subList">
                  {" "}
                  {el.list_sub.list_sub.join(" ")}
                </div>
                <div className="ShareCard_nick">{el.user.nickname}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ShareCard;
