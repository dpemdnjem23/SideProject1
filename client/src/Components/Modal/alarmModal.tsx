import { instance } from "App";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { alarmInfouseStore, mainheaderuseStore } from "utils/state";

import "../../css/common/modal/alarmModal.css";

const AlarmModal = () => {
  const [alarmMode, setAlarmMode] = useState<boolean>(false);
  const {
    showMypageModal,
    showNumber,
    setShowNumber,
    setShowAlarmModal,
    setShowAlarmPage,
    mobileMyPageOn,
    mobileMyPage,
    showMypageModalOn,
    setInfoNumber,
    infoNumber,
  } = mainheaderuseStore();
  const { alarmInfo, setAlarmInfo, alarmText, setAlarmText } =
    alarmInfouseStore();

  const closeAlarmModal = () => {
    setShowAlarmModal(false);
    setShowNumber(true);
    setShowAlarmPage(false);
  };

  const accessToken = localStorage.getItem("accessToken");
  //새 알림을 클릭하면 새알림의 색깔이 black , 콘텐츠
  // 읽은 알림 을 클릭하면 읽은 알림의 색깔이 black , 콘텐츠

  //반복문을 통해서 단한개의 false도 존재하지 않는
  const handlebulkReadClick = () => {
    //버튼 클릭시 alarm에 존재하는 read update
    instance
      .patch(`/alarm/update`, {})
      .then(() => {
        axios
          .get(`${process.env.REACT_APP_API_URI}/alarm/info`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            setAlarmInfo(res.data.data);
          })
          .catch((err) => {
            // console.log(err);
          });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const handleReadClick = (el: number) => {
    instance
      .patch(`/alarm/update`, { id: el })
      .then(() => {
        // console.log(res)

        axios
          .get(`${process.env.REACT_APP_API_URI}/alarm/info`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            setAlarmInfo(res.data.data);
          })
          .catch((err) => {
            // console.log(err);
          });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const handleNewClick = () => {
    setAlarmMode(false);
  };

  const handleOldClick = () => {
    setAlarmMode(true);
  };

  useEffect(() => {
    for (let i = 0; i < alarmInfo.length; i++) {
      if (alarmInfo[i].read === false) {
        setAlarmText(false);
      } else {
        setAlarmText(true);
      }
    }
  }, []);


  //알람을 가져와서 표현을할때에 존재하지 않으면,

  // <h1>현재 도착한 새알림이 없습니다.</h1>
  // <p>
  //   현재 구독 에 대한 알림만 진행하고 있습니다.<br></br>
  //   새로운 구독 정보나 갱신이 되면 알려드리겠습니다.
  // </p>
  const isSelected = alarmMode ? "newAlarm" : "oldAlarm";
  const isSelected2 = alarmMode ? "oldAlarm" : "newAlarm";
  const isSelectedAlarm = alarmText ? "newTextBox" : "";

  return (
    <div onClick={closeAlarmModal} id="AlarmModal">
      <div className="AlarmModal_background">
        <div
          onClick={(e) => e.stopPropagation()}
          className="AlarmModal_section"
        >
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
        
              <div className="AlarmModal_header_contents">
                <div
                  onClick={handlebulkReadClick}
                  className="AlarmModal_header_contents_read"
                >
                  모두 읽음 처리
                </div>
              </div>
            </div>

            <div className="AlarmModal_section_body">
              {
                alarmMode ? (
                  <div className="AlarmModal_section_body_text_old ">
                    알림은 7일 동안 보관됩니다.
                  </div>
                ) : alarmText ? (
                  <div
                    className={`AlarmModal_section_body_textbox ${isSelectedAlarm}`}
                  >
                    <h1>현재 도착한 새알림이 없습니다.</h1>
                    <p>
                      현재 구독 에 대한 알림만 진행하고 있습니다.
                      <br></br>
                      새로운 구독 정보나 갱신이 되면 알려드리겠습니다.
                    </p>
                  </div>
                ) : null

                // <div className={`AlarmModal_section_body_textbox`}>
                //   <h1>현재 도착한 새알림이 없습니다.</h1>
                //   <p>
                //     현재 구독 에 대한 알림만 진행하고 있습니다.
                //     <br></br>
                //     새로운 구독 정보나 갱신이 되면 알려드리겠습니다.
                //   </p>
                // </div>
              }

              {alarmMode
                ? alarmInfo.map((el) => {
                    if (el.read === true) {
                      return (
                        <div className="alarmInfo_old" key={el.id}>
                          <div className="alarmInfo_Section1">
                            <div className="alarmInfo_Section1_imgarea">
                              <img src={el.image} />
                            </div>
                            <div className="alarmInfo_Section1_contentarea">
                              <div>
                                <div className="alarmInfo_Section1_contentarea_title">
                                  {el.title}
                                </div>
                              </div>

                              <div>
                                갱신까지 {el.remain_time}일 남았습니다.
                                확인해주세요{" "}
                              </div>
                              {/* <div className="alarmInfo_Section1_contentarea_date"></div> */}
                            </div>
                            <div className="alarmInfo_Section1_contentarea2">
                              <span>
                                {el.createdAt.substr(5, 2) +
                                  "월 " +
                                  el.createdAt.substr(8, 2) +
                                  "일"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                : alarmInfo.map((el) => {
                    if (el.read === false) {
                      if (el) {
                        return (
                          <div className="alarmInfo" key={el.id}>
                            <div className="alarmInfo_Section1">
                              <div className="alarmInfo_Section1_imgarea">
                                <img src={el.image} />
                              </div>
                              <div className="alarmInfo_Section1_contentarea">
                                <div>
                                  <div className="alarmInfo_Section1_contentarea_title">
                                    {el.title}
                                  </div>
                                </div>

                                <div>
                                  갱신까지 {el.remain_time}일 남았습니다.
                                  확인해주세요{" "}
                                </div>
                                {/* <div className="alarmInfo_Section1_contentarea_date"></div> */}
                              </div>
                              <div className="alarmInfo_Section1_contentarea2">
                                <span>
                                  {el.createdAt.substr(5, 2) +
                                    "월 " +
                                    el.createdAt.substr(8, 2) +
                                    "일"}
                                </span>
                                <div onClick={() => handleReadClick(el.id)}>
                                  읽음
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className={`AlarmModal_section_body_textbox`}>
                            {/* {alarmInfo.length <= 0 ? ( */}
                            <h1>현재 도착한 새알림이 없습니다.</h1>
                            <p>
                              현재 구독 에 대한 알림만 진행하고 있습니다.
                              <br></br>
                              새로운 구독 정보나 갱신이 되면 알려드리겠습니다.
                            </p>
                          </div>
                        );
                      }
                    }
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </di
  );
};

export default AlarmModal;
