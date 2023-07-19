import { instance } from "App";
import Loading from "Components/Common/loading";
import ManageBoardContents from "Components/SharePageManage/ManageBoardContents";
import ManageBoardHeader from "Components/SharePageManage/ManageBoardHeader";
import React, { useState, useEffect } from "react";
import { shareSelectUseStore } from "utils/state";

import "../css/pages/NoticeBoardManage.css";
const NoticeBoardManage = () => {
  const [loading, setLoading] = useState(false);

  const { boardContents, setBoardContents } = shareSelectUseStore();

  useEffect(() => {
    instance
      .get("/share/selectinfo", {})
      .then((res) => {
        setBoardContents(res.data);
        setLoading(false);
      })
      .catch(() => {
        //   console.log(err)
      });
  }, []);

  return (
    <div className="NoticeBoardManage">
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="NoticeBoardManage_section">
          <div>
            <img src="/ready2.jpg"></img>
            <div>내가 쓴 구독 공유글 이 존재하지 않습니다.</div>
            <div>구독 고유글 을 작성후 확인바랍니다. </div>
          </div>

          <div className="NoticeBoardManage_text">
            <h1> 구독 공유 관리</h1>
            <p>내가 공유 했던 구독 들을 수정, 삭제로 관리할수 있습니다.</p>
          </div>

          <ManageBoardHeader></ManageBoardHeader>
          <ManageBoardContents></ManageBoardContents>
        </div>
      )}
    </div>
  );
};
export default NoticeBoardManage;
