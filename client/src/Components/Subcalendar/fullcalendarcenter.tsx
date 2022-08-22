import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import axios from "axios";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

import "moment/locale/ko";

import "../../css/components/CallendarPage/fullcalendarcenter.css";
import { useWalletStore } from "utils/state";

const FullCalendarCenter = () => {
  //start_date랑 같은 날짜에 해당하는 것만 map을 이용하여 달력에 나타낸다

  const [grab, setGrab] = useState<any>(null);
  const { walletInfo, setWalletInfo } = useWalletStore();
  // const [walletData , setWalletDate] = useState<number>(0)
  // const [listWallet,]
  const accessToken: string | null = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/wallet/info`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        let sum = 0;

        const costSum = res.data.data.map((pre: { cost: number }) => {
          return pre.cost;
        });

        for (let i = 0; i < costSum.length; i++) {
          sum = sum + costSum[i];
        }

        setWalletInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDragOver = (e: any) => {
    e.preventDefault();
  };
  const onDragStart = (e: any) => {
    e.target.classList.add("grabbing");
    e.dataTransfer.effectAllowed = "move";
    // e.dataTransfer.setData("text/html", e.target);
    e.dataTransfer.setData("text/html", e.target.id);

    // console.log(e.dataTransfer.setData("text/html", e.target))
  };

  const onDragEnd = (e: any) => {
    e.target.classList.remove("grabbing");
    e.dataTransfer.dropEffect = "move";
  };
  //놓앗을때 start_end를
  const onDrop = (e: any) => {

    //drop한 곳의 정보를 가져온다.
setGrab(e.target.id)





    const data = e.dataTransfer.getData("text/html"); // img태그 아이디를 가져옴
// console.log(date.format("YYYYMMDD"))
axios.patch(`${process.env.REACT_APP_API_URI}`)

    // axios.patch(`${process.env.REACT_APP_API_URI}`)

    //드랍한 곳으로 start_date를 변경한다.k

    
    // const list = [...lists];
    // list[grabPosition] = list.splice(targetPosition, 1, list[grabPosition])[0];

    // setLists(list);
  };

  //1. 달력에서 날짜를 클릭하면 그 요소를 담아서 subperiod와 edit에 보내줘야한다
  //2. 클릭할 경우 뒤로가기 edit인경우 edit으로 subregister인 경우 subregister로 이동

  const [date, setDate] = useState<moment.Moment>(() => moment());
  //moment는 객체로 반환된다.

  const handleDayClick = (current: moment.Moment) => {
    // back(-1);
    setDate(current);
  };

  const returnToday = () => setDate(moment());
  const jumpToMonth = (num: number) => {
    num
      ? setDate(date.clone().add(30, "day"))
      : setDate(date.clone().subtract(30, "day"));
  };
  //캘린더 생성
  const generate = () => {
    //초기값 설정

    const today = date;

    //startOf('month) 이번달의 첫번째 날로 설정
    // wee of year 이번 년도의 몇버째 주인가?
    const startWeek = today.clone().startOf("month").week();

    //이번달의 마지막 날로 설정 한 후 그것이 이번 년도의 면번째 주인지
    // 만약 이번해의 첫번째주(1월 1일이 속한 주) 라면 53으로 세팅, 아니면 그대로 한다.
    // 마지막 주가 첫주가 될 수 없기 때문
    const endWeek =
      today.clone().endOf("month").week() === 1
        ? 53
        : today.clone().endOf("month").week();

    const calendar = [];

    //시작주부터 마지막 주까지 +1
    // 주마다 일을 표기 길이가 7인 배열이ㅣ 필요하다.

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className="row" key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              const current = today
                .clone()
                .week(week)
                .startOf("week")
                .add(n + i, "day");


              const isSelected =
                today.format("YYYYMMDD") === current.format("YYYYMMDD")
                  ? "Fullselected"
                  : "";

              const isBlanked =
                current.format("MM") !== today.format("MM") ? "blanked" : "";
//오늘 날짜를 마킹한다. 
              // const isToday = today.format("YYYYMMDD") ? "todays" : "";

              return (
                
                <div
                id={current.format("YYYY-MM-DD") }
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onClick={() => handleDayClick(current)}
                  className={`Full_calendar_body_box_days ${isSelected}${isBlanked}`}
                  key={i}
                  //   onClick={() => handleDayClick(current)}
                >
                  <span className="Full_calendar_body_box_text">
                    {current.format("D")}
                  </span>
                  <ul className="divided">
                    {walletInfo.map((el: any, index: number) => {
                      // console.log(current.format("YYYYMMDD"))
                      if (current.format("YYYY-MM-DD") === el.start_date) {
                        // console.log(current.format("YYYY-MM-DD") )
                        return (
                          <li
                          
                            className="FullCalendar_section_sub"
                            key={index}
                            onDragEnd={onDragEnd}
                            draggable="true"
                            onDragStart={onDragStart}
                          >
                            <div className="fullCalendar_imgsec">
                              <img 
                                                          id={el.id}

                              src={el.image} />
                            </div>
                            {/* {el.name} */}
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              );
            })}
        </div>
      );
    }
    return calendar;
  };
  return (
    <div id="Full_calendar_section">
      <div className="Full_calendar_head_section">
        <div className="Full_calendar_head">
          <span className="Full_calendar_head_title">
            {date.locale("ko").format("YYYY") +
              " 년 " +
              date.locale("ko").format("MM") +
              " 월"}
            <Link to="/">
              <img className="Full_calendar_head_img" src="/images/2.png" />
            </Link>
          </span>
          <div className="Full_calendar_util-button">
            <button className="Full_calendar_today" onClick={returnToday}>
              Today
            </button>
            <button onClick={() => jumpToMonth(0)} className="Full_fas left">
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>

            <button onClick={() => jumpToMonth(1)} className="Full_fas right">
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      </div>
      <div className="Full_calendar_body">
        <div className="row">
          {["일", "월", "화", "수", "목", "금", "토"].map((el) => (
            <div className={`Full_calendar_body_box ${el}`} key={el}>
              <span className="Full_calendar_body_text">{el}</span>
            </div>
          ))}
        </div>
        {generate()}
      </div>
    </div>
  );

  //   return <div></div>;
};

export default FullCalendarCenter;
