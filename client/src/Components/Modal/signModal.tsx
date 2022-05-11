import React, { useState } from "react";

import "../../css/common/modal/signinmodal.css";

const SigninModal: React.FC<any> = ({ setShowModal }) => {
  const closemodal = () => {
    setShowModal(false);
  };
  return (
    <div onClick={closemodal} className="modal">
      <section onClick={(e) => e.stopPropagation()}>
        <header>
          <button onClick={closemodal} className="close">
            X
          </button>

          <div className="modal_title">간편가입 / 로그인</div>
          <div className="modal_title_desc">
            내가 무엇을 구독했는지 관리해보세요!
          </div>
        </header>
        <div className="modal_login_section">
          <input type="text" placeholder="이메일"></input>

          <input
            type="password"
            placeholder="비밀번호(문자,숫자포함 8자 이상)"
          ></input>
        </div>

        <div className="modal_button">
          <div className="email_login_bt">
            <div className="email_login ic">
              <img></img>
            </div>
            <div className="email_login_text">로그인</div>
          </div>
          <div className="email_signup_bt">
            <div className="email_signup ic">
              <img></img>
            </div>
            <div className="email_signup_text">이메일 회원가입</div>
          </div>
          <div className="google_login_bt">
            <div className="google_login ic">
              <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACNUExURUdwTECD8+pDNTOoU0KF8+pCNDCvUOpCNPNjJTOoUjOnU+pDNfu7BOpCMzOoUjeVrkGF9UGE80CA/zKnUulDNPu7BDOoUjCnUOxAM/y9A/u7BDOoUulCNEGE9OpCNUGF8/aUEzWgdu9uI4KwM7y1HUKF9OpDNTSoU/u8BfaxCj6L1jahce5ZK1qrQ9W4E02qYOQAAAAldFJOUwBAoKiA8BB+EH3iz7Bf8C9b8BBgr4DQIChgwJDg0JDA9Gbk9egGGMHPAAAA2ElEQVQ4y+2UyQ6DIBCGqRvivlVt7d4KaJf3f7yCpNWDUA9NvPidhuTLDPyTAMDCrNh+ZmLsZr6t9iCzBCZUaKWLB7jSpqU59LAmvZ7oZ2oQHnYKD8DOg2IglHv2iXv+72A2tHlgOCFBj9LmYk8Qt5RST5T1F2NEZB5d/1WcPJo/5mp15YoTcTEajef1JFV/NriYjAV+I4z0cwxj5u1H80FcJEhMP8eyyQBYeWcGOkKVQ+5tXR8lkRcBGdLGiWw5YT4UnVCxR9Q31S3lxq1Ud1gzHRXLRzMvbyw5IdzB4fwVAAAAAElFTkSuQmCC"
            
              />
            </div>
            <div className="google_login text">Google로 시작하기</div>
          </div>
          <div className="kakao_login_bt">
            <div className="kakao_login ic">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABIUExURUdwTP/kK/3kK//nKP/kK/7kK/7kK/7lKv7lKv/nKP3kK//kK/7lKwAAAA4MAi0oB4Z5Fu3VJ7imHkU+C+DJJZyNGmhdEdC8IjpxVbEAAAAMdFJOUwBgkCAw8MDQ4ECPX3SbiIQAAADwSURBVDjL7ZTZEoMgDEWRIqhFVtH//9Mi4AIGp9O+eh8zZ0hyE4LQI4T6gXacMzqQW6zx0KbuXcUI45nYq5K15YXaHuQ4IIAkLQS21+x7fXoxZtF7nZd+N0xZ6WXVlAJNASZfjBRjkJAmuQR2YhIWlMjceRxikz1xo4zZcQbSEHPnB0fhQpACJaoxkwL6juWo/MUIcgA0MgMNAMbUej4/OWsgdWyGTwcp5mQ5BexZB5Mw67YpYnh1nPdPKXcMuzB8GyG3YtbZ/nSVpbCuWLSmsmZTwbHfFxf+CuSfz/X9dy0PQHN7KwimbD0pmDzn1esDBTkeb1yOZtoAAAAASUVORK5CYII="
              
              
              ></img>
            </div>
            <div className="kakao_login text">카카오로 시작하기</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SigninModal;
