import React from "react";
import "../../css/components/MyPage/mypagebar.css";

const Mypagebar = () => {
  //현재 결제가 남은 구독갯수

  //top에는 결제일이 3일남앗다 3일남은 구독이 몇갡지
  //bottom에는 개인정보 수정
  //center에는 남은 결제액 / 총액수

  return (
    <>
      <div className="Mypage_bar_top container">
        <div className="Mypage_bar_top_date">
          <span>섭개더 x월</span>
          <div>
            <span>결제일 </span>
            <span>결제금액</span>
          </div>

          {/* <span>3-days / 2 (결제금액)</span> */}
        </div>
      </div>
      <div className="Mypage_bar_gap"></div>
      <div className="Mypage_bar_center container">
        <div className="Mypage_bar_gap">
          <span>난도모</span>
        </div>
      </div>
      <div className="Mypage_bar_gap"></div>
      <div className="Mypage_bar_bottom container"></div>
      <div>
        <span>sdfsfdas</span>
      </div>
    </>
  );
};

export default Mypagebar;
