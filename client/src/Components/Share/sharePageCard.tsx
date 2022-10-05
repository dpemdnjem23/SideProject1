import axios from "axios";
import Loading from "Components/Common/loading";
import React, { useState,useEffect } from "react";
import { paginationuseStore} from "utils/state";

import "../../css/components/SharePage/shareCard.css";
const ShareCard = () => {
    
  const {page,limit,setShareInfo,shareInfo} = paginationuseStore()
  const offset = (page - 1) * limit;






  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URI}/share/info`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setShareInfo(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


  // background-color: rgb(247, 249, 250);
  return (
    <div className="ShareCard">
      {loading ? <Loading></Loading>:null}
        {shareInfo.slice(offset,offset+limit).map((el)=>{
            return(
                <div key={el.id}>
                  <div className="ShareCard_title">{el.title}</div>
                  <div className="ShareCard_text">{el.description.substr(0,37)+"..."}</div>
                  <div className="ShareCard_subList"> {el.list_sub.join(' ')}</div>
                  <div className="ShareCard_nick" >{el.user.nickname}</div>

                </div>
            )

        })}
      {/* <div>
        <div>가나다라마바사아자차카타파하</div>
        <div>decription</div>
        <div>구독목록 3개정도만 표시...</div>
        <div>닉네임</div>
      </div>
      <div>
        <div>title</div>
        <div>decription</div>
        <div>구독목록 3개정도만 표사</div>
        <div>닉네임</div>
      </div>
      <div>
        <div>title</div>
        <div>decription</div>
        <div>구독목록 3개정도만 표사</div>
        <div>닉네임</div>
      </div>
      <div>
        <div>title</div>
        <div>decription</div>
        <div>구독목록 3개정도만 표사</div>
        <div>닉네임</div>
      </div>
      <div>
        <div>title</div>
        <div>decription</div>
        <div>구독목록 3개정도만 표사</div>
        <div>닉네임</div>
      </div>
      <div>
        <div>title</div>
        <div>decription</div>
        <div>구독목록 3개정도만 표사</div>
        <div>닉네임</div>
      </div> */}
    </div>
  );
};

export default ShareCard;
