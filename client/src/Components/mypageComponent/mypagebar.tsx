import React,{useRef} from "react";
import "../../css/components/MyPage/mypagebar.css";

const Mypagebar = () => {

  const line = useRef()
  //현재 결제가 남은 구독갯수

  //top에는 결제일이 3일남앗다 3일남은 구독이 몇갡지
  //bottom에는 개인정보 수정
  //center에는 남은 결제액 / 총액수

  //span의 변화가 일어나면 위쪽의 css도변화를 준다.

  return (
    <>
      <div className="Mypage_bar_top container">
        <div className="Mypage_bar_top_title">구독 결제일 / 결제금액</div>
<div className='Mypage_bar_top_section'>
        <div className="Mypage_bar_top_section1">
          <span className="Mypage_bar_top_section1_days">결제일 </span>
          <span ref={line} className="Mypage_bar_top_section1_pay">결제금액</span>
        </div>
        <div className="Mypage_bar_top_section2">
          <span className="Mypage_bar_top_section2_days">14 일</span>
          <span className="Mypage_bar_top_section2_slash">/</span>
          <span className="Mypage_bar_top_section2_pay">5,000 원</span>
        </div>
        </div>
        {/* <span>3-days / 2 (결제금액)</span> */}
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
