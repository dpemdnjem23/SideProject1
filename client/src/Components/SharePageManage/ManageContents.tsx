import React from "react";

const ManageContents = () => {
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
                <button>
                    수정
                </button>
                <button>
                    삭제
                </button>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};
export default ManageContents;
