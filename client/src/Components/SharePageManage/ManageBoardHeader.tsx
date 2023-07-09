import { instance } from "App";
import React from "react";
import "../../css/components/SharPageManage/ManageBoardHeader.css";
import DeleteBoard from "./ManageBoardContents";

const ManageBoardHeader = () => {


  return (
    <table className="ManageBoardHeader">
      <thead>
        <tr>
          <th>PostId</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>게시물 관리</th>
        </tr>
      </thead>
    </table>
  );
};
export default ManageBoardHeader;
