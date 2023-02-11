import axios from "axios";
import React, { useState, useEffect } from "react";
import { alarmInfouseStore, mainheaderuseStore } from "utils/state";

import "../../css/components/Alarm/alarmMain.css";
const AlarmMain = () => {
  const {
    alarmInfo,
    alarmMode,
    setAlarmMode,
    setAlarmInfo,
    alarmText,
    setAlarmText,
  } = alarmInfouseStore();

  const accessToken = localStorage.getItem("accessToken");
  const {
    showMypageModal,
    showNumber,
    mobileMyPageOn,
    mobileMyPage,
    infoNumber,
    setShowNumber,
    showMypageModalOn,
    setShowAlarmModal,
    setShowAlarmPage,
  } = mainheaderuseStore();

  const closeAlarmPage = () => {
    setShowAlarmPage(false);
    setShowNumber(true);
    setShowAlarmModal(false);
  };
  const handlebulkReadClick = () => {
    //버튼 클릭시 alarm에 존재하는 read update
    axios
      .patch(
        `${process.env.REACT_APP_API_URI}/alarm/update`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
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
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReadClick = (el: number) => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URI}/alarm/update`,
        { id: el },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
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
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
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

  const isSelectedAlarm = alarmText ? "newTextBox" : "";

  return (
    <div className="AlarmMain">
      {alarmMode ? (
        <div className="AlarmMain_section_text_old ">
          알림은 7일 동안 보관됩니다.
        </div>
      ) : alarmText ? (
        <div className={`AlarmMain_section_textbox ${isSelectedAlarm}`}>
          <h1>현재 도착한 새알림이 없습니다.</h1>
          <p>
            현재 구독 에 대한 알림만 진행하고 있습니다. 새로운 구독 정보나
            갱신이 되면 알려드리겠습니다.
          </p>
        </div>
      ) : null}

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
                        갱신까지 {el.remain_time}일 남았습니다. 확인해주세요{" "}
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
                          갱신까지 {el.remain_time}일 남았습니다. 확인해주세요{" "}
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
                        <div onClick={() => handleReadClick(el.id)}>읽음</div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className={`AlarmMain_section_textbox`}>
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
  );
};

export default AlarmMain;
