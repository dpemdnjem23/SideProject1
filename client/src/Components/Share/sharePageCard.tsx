import axios from "axios";
import React, { useState,useEffect } from "react";

import "../../css/components/SharePage/shareCard.css";
const ShareCard = () => {
    
  const accessToken = localStorage.getItem("accessToken");

  const [shareInfo, setShareInfo] = useState<any>([]);
  const [limit, setLimit] = useState<number>(6);
  const [page, setPage] = useState<number>(1);
  const offset = (page - 1) * limit;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URI}/share/info`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        setShareInfo(res.data)
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(shareInfo)
  }, []);
  // background-color: rgb(247, 249, 250);
  return (
    <div className="ShareCard">
      <div>
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
      </div>
    </div>
  );
};

export default ShareCard;
