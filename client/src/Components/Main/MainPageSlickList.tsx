import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/components/MainPage/MainPageSlickList.css";
const MainPageSlickList = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    cssEase: "linear",
  };
  return (
    <div className="MainPageSlickList">
      <Slider {...settings}>
        <div className="MainPageSlickList_items">
          <div className="MainPageSlickList_items"></div>
        </div>
        <div className="MainPageSlickList_items">
          <img src="./subscribes/트위치.png"></img>
        </div>{" "}
        <div className="MainPageSlickList_items">
          <img src="./subscribes/청소연구소.png"></img>
        </div>{" "}
        <div className="MainPageSlickList_items">
          <img src="./subscribes/지니.png"></img>
        </div>{" "}
        <div className="MainPageSlickList_items">
          <img src="./subscribes/유튜브 프리미엄.png"></img>
        </div>{" "}
        <div className="MainPageSlickList_items">
          <img src="./subscribes/윌라.png"></img>
        </div>{" "}
        <div className="MainPageSlickList_items">
          <img src="./subscribes/위클리셔츠.png"></img>
        </div>{" "}
        <div className="MainPageSlickList_items">
          <img src="./subscribes/현대셀렉션.png"></img>
        </div>{" "}
        <div className="MainPageSlickList_items">
          <img src="./subscribes/필리.png"></img>
        </div>{" "}
        <div className="MainPageSlickList_items">
          <img src="./subscribes/티빙.png"></img>
        </div>{" "}
        <div className="MainPageSlickList_items">
          <img src="./subscribes/라프텔.png"></img>
        </div>{" "}
        <div className="MainPageSlickList_items">
          <img src="./subscribes/런드리고.png"></img>
        </div>{" "}
        
     
      </Slider>
    </div>
  );
};

export default MainPageSlickList;
