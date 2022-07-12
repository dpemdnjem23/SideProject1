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
import { showDropDownList } from "utils/state";

const MypageSelectBox = () => {
  const input: any = useRef();
  // const navigate = useNavigate()
  const accessToken: string | null = localStorage.getItem("accessToken");
  const [useSubscribe, setUseSubscribe] = useState([]);
  const [selected, setSelected] = useState("");

  const { setDropDownOpen, dropDownOpen } = showDropDownList();

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

  const onClickSelect = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const changeOption = () => {
    // const selectValue =
    setSelected(input.current.textContent);
    console.log();
  };

  const openToggling = () => {
    setDropDownOpen(true);
  };
  // const onChange = (e) => {};

  // console.log(useSubscirbe[0]['id'])

  return (
    <div onClick={onClickSelect} className="select_box">
      <div className="selected_value_box">
        <div
          suppressContentEditableWarning={true}
          contentEditable
          placeholder="구독 서비스 정보를 입력해 주세요"
          className="selected_value"
        >
          {selected}
        </div>
      </div>
      {dropDownOpen ? (
        <ul onClick={changeOption} className="option_list">
          {useSubscribe.map((el: any) => {
            return (
              <li key={el.id} className="option">
                <img src={el.image}></img>
                {el.sub_name}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default MypageSelectBox;
