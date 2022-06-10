import React, { useState } from "react";

import moment from "moment";


import '../../css/common/Calendar.css'
import 'moment/locale/ko'

const Calendar = () => {
  const [date, setDate] = useState<moment.Moment>(moment());
  //moment는 객체로 반환된다.

  const handleDayClick = (current: moment.Moment) => setDate(current);

  const returnToday = () => setDate(moment());


  //캘린더 생성
  const generate = () => {
    //초기값 설정

    const today = date.locale('ko')
    

    //startOf('month) 이번달의 첫번째 날로 설정
    // wee of year 이번 년도의 몇버째 주인가?
    const startWeek: number = today.clone().startOf("month").week();

    //이번달의 마지막 날로 설정 한 후 그것이 이번 년도의 면번째 주인지
    // 만약 이번해의 첫번째주(1월 1일이 속한 주) 라면 53으로 세팅, 아니면 그대로 한다.
    // 마지막 주가 첫주가 될 수 없기 때문
    const endWeek: number =
      today.clone().endOf("month").week() === 1
        ? 53
        : today.clone().endOf("month").week();

    console.log(startWeek);

    const callendar: any = [];


    console.log(callendar)

    //시작주부터 마지막 주까지 +1
    // 주마다 일을 표기 길이가 7인 배열이ㅣ 필요하다.

    for (let week = startWeek; week <= endWeek; week++) {
      callendar.push(
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
                  ? "selectd"
                  : "";

              return (
                <div
                  className={`box ${isSelected}}`}
                  key={i}
                //   onClick={() => handleDayClick(current)}
                >
                  <span className="text">{current.format("D")}</span>
                </div>
              );
            })}
        </div>
      );
    }

    return callendar
  };
  return (
    <div id='calendarSection'>
      <div className='calendareHead'>
        <div className="head">
          <span className="title">{date.locale('ko').format('YYYY')+' 년 '+date.locale('ko').format('MM')+' 월'}</span>
          <div className="util-button">
            <button >
              <i className="fas fa-angle-left"></i>
            </button>
            <button onClick={returnToday}>Today</button>
            <button >
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div className='calendarBody'>
        <div className="row">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((el) => (
            <div className="box" key={el}>
              <span className="text">{el}</span>
            </div>
          ))}
        </div>
        {generate()}
      </div>
    </div>
  );

  //   return <div></div>;
};

export default Calendar;
