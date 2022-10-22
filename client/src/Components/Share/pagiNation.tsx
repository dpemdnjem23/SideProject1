import React, { useState,  useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { paginationuseStore, shareCarduseStore} from "utils/state";


import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import{faAngleLeft,faAngleRight} from '@fortawesome/free-regular-svg-icons'
// import {fa-thin}
import "../../css/components/SharePage/pagiNation.css";
import axios from "axios";
const SharePagiNation = () => {
  const { page, setPage } = paginationuseStore();
  const {setShareInfo, setLoading,shareInfo,loading} = shareCarduseStore()
  const [countPage,setCountPage] = useState<number>(0)

  const limit =6
  // const numPages:number |null= 20;
  const numPages = Math.ceil(countPage / limit);

const pageNumbers:number[] = []
   for (let i = 1; i <= numPages; i++) {

   

    pageNumbers.push(i)


  }

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URI}/share/info`, {
      headers: {
        "Content-Type": "application/json",
      },
    
    })
      .then((res) => {
        setCountPage(res.data.countShareInfo)
        
        
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

 
  //페이지는 게시물수에 따른다.

  //페이지 네이션 page 번호를 누를때 포커스가 유지되어야 한다

  //페이지 를 바꿀때
  const handleChangePage = (val: number) => {
    setPage(val);

    // chaneFocus=
  };

  //다음을 누르는경우
  //버튼을 클릭하면 해당 버튼은 div로 바뀐다.
  //

  const handleChangeIndexUp = () => {
    setPage(page + 1);
  };
  // //이전을 누르는 경우
  const handleChangeIndexDown = () => {
    setPage(page - 1);
  };
  return (
    <>

    {loading? null :
      
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
        {pageNumbers
          .map((v, i) => {
            return (
              <button
                // id={i+1}
                // ref={el=>{buttonRef}}
                // onFocus
                
                className={page==i+1? 'pagination_secondbt btfocus' :'pagination_secondbt'}
                onClick={() => handleChangePage(i + 1)}
                key={i + 1}
              >
                {i + 1}
              </button>
            );
          })}

      </div>
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
    
}
</>
  );
};

export default SharePagiNation;
