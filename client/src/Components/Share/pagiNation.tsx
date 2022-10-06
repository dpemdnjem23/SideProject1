import React, { useState, useRef } from "react";
import { paginationuseStore } from "utils/state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import{faAngleLeft,faAngleRight} from '@fortawesome/free-regular-svg-icons'
// import {fa-thin}
import "../../css/components/SharePage/pagiNation.css";
const SharePagiNation = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { page, setPage, limit, setLimit, shareInfo } = paginationuseStore();
  const numPages = 8;
  // const numPages = Math.ceil(shareInfo.length / limit);
//페이지는 게시물수에 따른다.

if(buttonRef.current !==null){
  console.log(buttonRef)
}

const buttonFocus = 
//페이지 네이션 page 번호를 누를때 포커스가 유지되어야 한다

//페이지 를 바꿀때 
  const handleChangePage = (val: number) => {
    setPage(val);
  };

  //다음을 누르는경우

  const handleChangeIndexUp = () => {
    setPage(page + 1);
  };
  // //이전을 누르는 경우
  const handleChangeIndexDown = () => {
    setPage(page - 1);
  };
  return (
    <div className="pagination">
      <button
        onClick={handleChangeIndexDown}
        className="pagination_firstbt"
        disabled={page === 1}
      >
        <FontAwesomeIcon
          className="pagination_icon"
          icon={faAngleLeft}
        ></FontAwesomeIcon>
        <span>이전</span>
      </button>
      <div>
        {Array(numPages)
          .fill(0)
          .map((v, i) => {
            return (
              <button
                ref={buttonRef}
                className="pagination_secondbt"
                onClick={() => handleChangePage(i + 1)}
                key={i + 1}
              >
                {i + 1}
              </button>
            );
          })}
      </div>
      {/* <div>1 2 3 4 5 6 7 8</div> */}
      <button
        onClick={handleChangeIndexUp}
        className="pagination_thirdbt"
        disabled={page === numPages}
      >
        <span>다음</span>
        <FontAwesomeIcon
          className="pagination_icon"
          icon={faAngleRight}
        ></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default SharePagiNation;
