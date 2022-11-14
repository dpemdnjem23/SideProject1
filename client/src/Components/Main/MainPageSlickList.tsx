import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/components/MainPage/MainPageSlickList.css";
const MainPageSlickList = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    cssEase: "linear",
    draggable: false,
  };

  const target2 = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [raise, setRaise] = useState<boolean>(false);

  const options = {
    root: document.querySelector('.MainPageSlickList'), // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: "0px 0px 0px 0px", // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: 1, // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entries[0].isIntersecting) {
          setRaise(entry.isIntersecting);

          console.log(entries[0].isIntersecting); // entry is 'IntersectionObserverEntry'
        }
        if (!entries[0].isIntersecting) {
          setRaise(entry.isIntersecting);
          console.log(entries[0].isIntersecting); // entry is 'IntersectionObserverEntry'

          // entry is 'IntersectionObserverEntry'
        }
      });
    }, options);

    observer.observe(target2.current);
  }, [target2]);
  return (
    <div ref={target2} className="MainPageSlickList">
      <Slider {...settings}>
        <div className="MainPageSlickList_items">
          <div className="MainPageSlickList_items"></div>
        </div>
        <div className="MainPageSlickList_items">
          <img src="./subscribes/트위치.png"></img>
        </div>
        <div className="MainPageSlickList_items">
          <img src="./subscribes/청소연구소.png"></img>
        </div>
        <div className="MainPageSlickList_items">
          <img src="./subscribes/지니.png"></img>
        </div>
        <div className="MainPageSlickList_items">
          <img src="./subscribes/유튜브 프리미엄.png"></img>
        </div>
        <div className="MainPageSlickList_items">
          <img src="./subscribes/윌라.png"></img>
        </div>
        <div className="MainPageSlickList_items">
          <img src="./subscribes/위클리셔츠.png"></img>
        </div>
        <div className="MainPageSlickList_items">
          <img src="./subscribes/현대셀렉션.png"></img>
        </div>
        <div className="MainPageSlickList_items">
          <img src="./subscribes/필리.png"></img>
        </div>
        <div className="MainPageSlickList_items">
          <img src="./subscribes/티빙.png"></img>
        </div>
        <div className="MainPageSlickList_items">
          <img src="./subscribes/라프텔.png"></img>
        </div>
        <div className="MainPageSlickList_items">
          <img src="./subscribes/런드리고.png"></img>
        </div>
      </Slider>
    </div>
  );
};

export default MainPageSlickList;
