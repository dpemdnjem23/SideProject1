import React, { useState } from "react";

const SharePagiNation = () => {
    const [limit, setLimit] = useState<number>(6);
    const [page, setPage] = useState<number>(1);
    const offset = (page - 1) * limit;

    //페이지 설정
    
  //화살표를 클릭하면 페이지를 한개씩 올린다.

  const handleChangeIndexUp=() =>{


  }
  const handleChangeIndexDown = () =>{

  }
  return <div></div>;
};

export default SharePagiNation;
