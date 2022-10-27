import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/components/MainPage/MainPageSlickList.css";
const MainPageSlickList = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    initialSlide: 1,
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
          {/* <img src="./넷플릭스.png"></img> */}
        </div>
      </Slider>
    </div>
  );
};

export default MainPageSlickList;
