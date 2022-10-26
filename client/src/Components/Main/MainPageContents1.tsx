import React, { useState, useEffect } from "react";

import "../../css/components/MainPage/MainPageContents1.css";
const MainPageContents1 = () => {
  return (
    <div className="MainPageContents1">
      <div className="MainPageContents1_section">
          <div className="MainPageCotents1_text">

        <div>
          <p className="MainPageContents1_section_p">
            더 쉽게 구독관리를 해보세요, <br></br>구독관리는<br></br>{" "}
            subgather에서 해보세요
          </p>
          <p className="MainPageContents1_section_p2">
            정리하기 귀찮으셨다면,<br></br> 생활속 구독들을 만나보세요
          </p>
          <div className='MainPageContents1_bt_section'>
            <button>subgather 시작하기</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageContents1;
