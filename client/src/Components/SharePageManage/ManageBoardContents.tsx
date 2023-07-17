import { instance } from "App";
import React, { useState, useEffect } from "react";
// import

const ManageBoardContents = () => {
  const [boardContents, setBoardContents] = useState([]);

  const localstorageUserInfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || "{}"
  );
  //갯수만큼

  instance
    .get("/share/selectifno", {})
    .then((res) => {
      setBoardContents(res.data);
    })
    .catch(() => {
      //   console.log(err)
    });

    console.log(boardContents)

  return (
    <table className="ManageBoardContents">
      <thead>
        {boardContents.map((contents:any) => {
          return (
            <tr key={contents.id}>
              <th>{contents.id}</th>
              <th>{contents.title}</th>
              <th>{localstorageUserInfo.nickname}</th>
              <th>{'날짜'}</th>
              <th>
                  <button></button>
                  <button></button>
              </th>
            </tr>
          );
        })}
      </thead>
    </table>
  );
};
export default ManageBoardContents;
