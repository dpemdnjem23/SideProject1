import React, { useState, useEffect, useRef } from "react";
// import


import "../../css/components/MainPage/MainPageMobile2.css";
const MainPageMobile2 = () => {

  const target2 = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [raise, setRaise] = useState<boolean>(false);

 
  const options = {
    root: null, // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: "0px 0px 0px 0px", // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: 0.6, // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entries[0].isIntersecting) {
          setRaise(entry.isIntersecting);
        }
      });
    }, options);

    observer.observe(target2.current);
  }, [target2]);

  const on = raise ? "on" : "";

  return (
<>
      <div ref={target2} className="MainPageMobile2_section">
        {/* {match ? ( */}
          <div className={`MainPageMobile2_section_text ${on}`}>
            {/* <div {...animatedItem1}> */}
            <p className="raise_up1 MainPageMobile2_section_text_category">
              SUBSCRIPTION
            </p>
            <h2 className="raise_up1 MainPageMobile2_section_text_title">
              보다 편하게 관리<br className="ungiven"></br> 구독관리
            </h2>
            {/* </div> */}

            {/* <div {...animatedItem2}> */}
            <p className="raise_up2 MainPageMobile2_section_text_contents MainPageContents">
              사용하고 있는 구독명을 선택하고, <br></br> 기간, 가격을 입력하고
              등록해주세요
            </p>
            {/* </div> */}
          </div>

        <div className={`MainPageMobile2_section_image ${on}`}>
          <img
            className="raise_up3 MainPageMobile2_section_image_img1 imgBack2"
            src="/2img.png"
          ></img>
          <img
            className="raise_up3 MainPageMobile2_section_image_img2 imgBack2"
            src="/1img.png"
          ></img>
        </div>
      </div>
      </>
  );
};

export default MainPageMobile2;
