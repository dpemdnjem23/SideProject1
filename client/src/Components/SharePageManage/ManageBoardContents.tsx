import { instance } from "App";
import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { shareSelectUseStore } from "utils/state";
// import

import "../../css/components/SharPageManage/ManageBoardContents.css";

const ManageBoardContents = () => {
  const [loading, SetLoading] = useState(false);
  const { boardContents, setBoardContents } = shareSelectUseStore();

  const localstorageUserInfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || "{}"
  );
  //갯수만큼
  // moment()

  const handleEditClick = (id: number) => {
    //
    localStorage.setItem("share", JSON.stringify(boardContents[id]));
  };

  const handleDeleteClick = (id: number) => {
    instance
      .delete("/share/delete", {
        data: {
          id: id,
        },
      })
      .then((res) => {
        // setCardModal(false);
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <table className="ManageBoardContents">
      <thead>
        {boardContents.map((contents: any) => {
          return (
            <tr key={contents.id}>
              <th>{contents.id}</th>
              <th>{contents.title}</th>
              <th>{localstorageUserInfo.nickname}</th>
              <th>{contents.createdAt.substring(0, 10)}</th>
              <th>
                <button onClick={() => handleEditClick(contents.id)}>
                  수정
                </button>
                <button onClick={() => handleDeleteClick(contents.id)}>
                  삭제
                </button>
              </th>
            </tr>
          );
        })}
      </thead>
    </table>
  );
};
export default ManageBoardContents;
