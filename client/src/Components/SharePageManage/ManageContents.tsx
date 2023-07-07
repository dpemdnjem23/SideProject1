import { instance } from "App";
import React from "react";
import "../../css/components/SharPageManage/ManageContents.css";
import DeleteBoard from "./DeleteBoard";
import EditBoard from "./EditBoard";

const ManageContents = () => {
  const localstorageUserInfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || "{}"
  );
  //갯수만큼

//   instance
//     .get("/share/selectifno", {})
//     .then((res) => {})
//     .catch((err) => {});

  return (
    <div className="ManageContents">
      <table>
        <thead>
          <tr>
            <th>PostId</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>
              <EditBoard></EditBoard>
              <DeleteBoard></DeleteBoard>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};
export default ManageContents;
