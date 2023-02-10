import axios from "axios";
import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { alarmInfouseStore, mainheaderuseStore } from "utils/state";

import "../../css/components/Alarm/alarmTop.css";
const AlarmTop = () => {
  const [alarmMode, setAlarmMode] = useState<boolean>(false);

  const { alarmInfo, setAlarmInfo, alarmText, setAlarmText } =
    alarmInfouseStore();

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
    setShowAlarmModal(false)
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

  const isSelected = alarmMode ? "newAlarm" : "oldAlarm";
  const isSelected2 = alarmMode ? "oldAlarm" : "newAlarm";
  const isSelectedAlarm = alarmText ? "newTextBox" : "";
  return (
    <div className="AlarmTop">
      <div className="AlarmTop_Xbutton">
        <div>
          <FontAwesomeIcon
            onClick={closeAlarmPage}
            size="lg"
            icon={faX}
          ></FontAwesomeIcon>
        </div>
      </div>

      <div className='AlarmTop_section'>
        <div className="AlarmTop_contents">
          <div
            onClick={handleNewClick}
            className={`AlarmTop_contents_Element ${isSelected2}`}
          >
            <span>새 알림</span>
          </div>
          <div
            onClick={handleOldClick}
            className={`AlarmTop_contents_Element ${isSelected}`}
          >
            <span>읽은 알림</span>
          </div>
        </div>

        <div className="AlarmTop_contents">
          <div
            onClick={handlebulkReadClick}
            className="AlarmModal_header_contents_read"
          >
            모두 읽음 처리
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlarmTop;
