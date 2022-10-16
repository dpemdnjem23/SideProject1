import axios from "axios";
import React, { useState,useEffect } from "react";
import { paginationuseStore, shareCarduseStore} from "utils/state";

import "../../css/components/SharePage/shareCard.css";
const ShareCard = () => {
    
  const {page} = paginationuseStore()
  const {setShareInfo, setLoading,shareInfo,setCardIndex,setClickModalNum,setCardModal} = shareCarduseStore()
  const limit =6 
  const offset = (page - 1) * limit;

  const openCardModal=(index:number,el:number) =>{
    setCardIndex(el)
    setClickModalNum(index)
    setCardModal(true)


  }









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

  console.log(shareInfo[0].list_sub.list_sub.join(' '))


  // background-color: rgb(247, 249, 250);
  return (

    <div className="ShareCard">
        {shareInfo.slice(offset,offset+limit).map((el,index)=>{
            return(
                <div
                onClick={()=>openCardModal(index,el.id)}
                 key={el.id}>
                  <div className="ShareCard_title">{el.title}</div>
                  <div className="ShareCard_text">{el.description.substr(0,37)+"..."}</div>
                  <div className="ShareCard_subList"> {el.list_sub.list_sub.join(' ')}</div>
                  <div className="ShareCard_nick" >{el.user.nickname}</div>

                </div>
            )

        })}
   
    </div>

  );
};

export default ShareCard;
