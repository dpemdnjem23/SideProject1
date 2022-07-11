import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router";
axios.defaults.headers.get["Content-Type"] = "application/json";

// ../../../../public/subscribes/네이버 플러스.png

// type subInfo = {
//   [sub_name: string]: string;
//   [image: string]: string;
//   [id: number]: number;
// };
import "../../../css/components/MyPage/MypageSub/mypageSelectBox.css";

const MypageSelectBox = () => {
  const input: any = useRef();
  // const navigate = useNavigate()
  const accessToken: string | null = localStorage.getItem("accessToken");
  const [useSubscirbe, setUseSubscribe] = useState([]);
  const [selected, setSelected] = useState("");

  const subscribes = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/wallet/subregist`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUseSubscribe(res.data);
      })
      .catch((err) => {
        //   navigate('/')
      });
  };
  useEffect(() => {
    subscribes();
  }, []);

  const onClickSelect = (e: any) => {
    const isActive = e.currentTarget.className.indexOf("active") !== -1;

    console.log(isActive);
    if (isActive) {
      console.log(e.currentTarget.className);

      e.currentTarget.className = "select_box";
    } else {
      console.log(e.currentTarget.className);

      e.currentTarget.className = "select_box active";
    }
  };
  //변할때마다.

  const changeOption = (e: any) => {
    setSelected(input.current.textContent);
  };

  // console.log(useSubscirbe[0]['id'])

  return (
    <div
      placeholder="서비ㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴ스"
      onClick={onClickSelect}
      className="select_box"
    >
      <div className="selected_value_box">
        <span className="selected_value">{selected}</span>
      </div>
      <ul onClick={changeOption} className="option_list">
        <li ref={input} defaultValue="넷플릭스" className="option">
          이미지 넷플릭스
        </li>
        <li ref={input} className="option">
          <img className='option_image' src='./넷플릭스.png' /> 네이버 플러스
        </li>
        <li ref={input} className="option">
          이미지 쿠팡
        </li>
      </ul>
    </div>
  );
};

export default MypageSelectBox;
