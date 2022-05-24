import react from "react";

const Mypageinfo = () => {
  return (
    <div className="Mypage_left section">
      <div className="Mypage_user">
        <img className="Mypage_user_img" src="./images/wallet-6551548.svg" />
        <div className="Mypage_user_top"></div>
        <span className="Mypage_user_text">오징어게임</span>
        <span className="Mypage_user_text">구독 현황:15</span>
      </div>
      <div className="Mypage_sub_text">나의 구독</div>
      <div className="Mypage_sub_section"></div>
    </div>
  );
};
export default Mypageinfo