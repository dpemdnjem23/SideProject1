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
  // const navigate = useNavigate()
  const accessToken: string | null = localStorage.getItem("accessToken");
  const [useSubscirbe, setUseSubscribe] = useState([]);

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

  // console.log(useSubscirbe[0]['id'])

  return (
    <label>
      {/* <input width="200" id="sts" type="text" list="list"></input> */}

      {/* <img src='/넷플릭스.png' /> */}
      {/* <datalist id="list"> */}
      <select className="sts">
        {useSubscirbe.map((el: any) => {
          // console.log(el.sub_name)
          return <option value={el.sub_name} key={el.id}></option>;
        })}
        <option className="stss"></option>
      </select>
      {/* </datalist> */}
    </label>
  );
};

export default MypageSelectBox;
