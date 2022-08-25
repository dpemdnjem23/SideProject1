import { useEffect } from "preact/hooks";
import React, { useState } from "react";

import "../../css/common/modal/alarmModal.css";

const AlarmModal = () => {
  const [alarmMode, setAlarmMode] = useState<boolean>(false);
  const [alarmInfo,setAlarmInfo] = useState()

  //새 알림을 클릭하면 새알림의 색깔이 black , 콘텐츠
  // 읽은 알림 을 클릭하면 읽은 알림의 색깔이 black , 콘텐츠

  // useEffect(()=>{


    
  // },[])

  const handleNewClick = () => {
    setAlarmMode(false);
  };

  const handleOldClick = () => {
    setAlarmMode(true);
  };

  const isSelected = alarmMode ? "newAlarm" : "oldAlarm";
  const isSelected2 = alarmMode ? "oldAlarm" : "newAlarm";

  return (
    <div id="AlarmModal">
      <div className="AlarmModal_background">
        <div className="AlarmModal_section">
          {/* <div className="AlarmModal_section"> */}
          <div className="AlarmModal_section_contents">
            <div className="AlarmModal_header">
              <div className="AlarmModal_header_contents">
                <div
                  onClick={handleNewClick}
                  className={`AlarmModal_header_Element ${isSelected2}`}
                >
                  <span>새 알림</span>
                </div>
                <div
                  onClick={handleOldClick}
                  className={`AlarmModal_header_Element ${isSelected}`}
                >
                  <span>읽은 알림</span>
                </div>
              </div>
              <div className="AlarmModal_header_contents"></div>

              <div></div>
            </div>

            <div className="AlarmModal_section_body">
              {alarmMode? <div className="AlarmModal_section_body_text_old">
                알림은 30일동안만 보관됩니다.
              </div> :
              
              
              <div className="AlarmModal_section_body_textbox">
                <h1>현재 도착한 새알림이 없습니다.</h1>
                <p>
                  현재 구독 에 대한 알림만 진행하고 있습니다.<br></br>새로운
                  구독 정보나 갱신이 되면 알려드리겠습니다.
                </p>
              </div>
            }
           
            </div>
          </div>
        </div>
      </div>
    </div>
    // </di
  );
};

export default AlarmModal;
