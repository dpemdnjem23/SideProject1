import React, { useState } from "react";
import { paginationuseStore } from "utils/state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "../../css/components/SharePage/pagiNation.css";
const SharePagiNation = () => {
  const { page, setPage, limit, setLimit, shareInfo } = paginationuseStore();
const numPages = 8
  // const numPages = Math.ceil(shareInfo.length / limit);

  //페이지는 게시물수에 따른다.

  const handleChangePage = (val:number) => {
    setPage(val)
  };

  //다음을 누르는경우

  // const handleChangeIndexUp=() =>{

  // }
  // //이전을 누르는 경우
  // const handleChangeIndexDown = () =>{

  // }
  return (
    <div className="pagination">
      <button className = 'pagination_firsbt' >
        <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
        <span>이전</span>
      </button>
      <div>
        {Array(numPages).fill(0).map((v,i)=>{
          return(
            <button 
            autoFocus
            className="pagination_secondbt" 
            onClick = {() =>handleChangePage(i+1)}
            
            key={i+1}>
            {i+1}

          </button>
          )
        })}
      </div>
      {/* <div>1 2 3 4 5 6 7 8</div> */}
      <button className="pagination_thirdbt" disabled={page === numPages}>
        <span>다음</span>
        <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default SharePagiNation;
