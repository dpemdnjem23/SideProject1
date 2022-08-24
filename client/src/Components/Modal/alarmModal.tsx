import React from "react";

import "../../css/common/modal/alarmModal.css";

const AlarmModal = () => {


  const handleClick = () =>{
    
  }
  return (
    <div id="AlarmModal">
      <div className="AlarmModal_background">
        <div className="AlarmModal_section">
          {/* <div className="AlarmModal_section"> */}
          <div className="AlarmModal_section_contents">
            <div className="AlarmModal_header">
              <div className="AlarmModal_header_contents">
                <div className="AlarmModal_header_newAlarm">
                  <span>새 알림</span>
                </div>
                <div className="AlarmModal_header_oldAlarm">
                  <span>읽은 알림</span>
                </div>
              </div>
              <div className="AlarmModal_header_contents">


                </div>

              <div></div>
            </div>

            <div>
              <h1>현재 도착한 새알림이 없습니다.</h1>
              <p>
                현재 구독 에 대한 알림만 진행하고 있습니다. 새로운 구독 정보나
                갱신이 되면 알려드리겠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </di
  );
};

export default AlarmModal;
