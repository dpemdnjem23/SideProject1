import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router";
axios.defaults.headers.get["Content-Type"] = "application/json";

// ../../../../public/subscribes/네이버 플러스.png

type subInfo = {
  id: number;
  image: string;
  sub_name: string;
};

import "../../../css/components/MyPage/MypageSub/mypageSelectBox.css";
import { showDropDownList } from "utils/state";

const MypageSelectBox = () => {
  const navigate = useNavigate();
  // const {subName} = e.target as HTMLElement

  const { setDropDownOpen, dropDownOpen } = showDropDownList();

  // const navigate = useNavigate()
  const accessToken: string | null = localStorage.getItem("accessToken");
  const [useSubscribe, setUseSubscribe] = useState<any>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [newArr,setNewArr] = useState<any>([])
  //autocomplete
  //hastext는 input 값 유무
  const [hasText, setHasText] = useState<boolean>(false);
  //inputValue state 는 input갑스이 상태를 확인
  const [inputValue, setInputValue] = useState<string | null>("");
  //input값을 포함하는 autocomplete 추천 항목 리스트를 확인
  const [auto, setAuto] = useState(false);

 
  //인풋밸류가 , 자동완성이 안된경우, 존재하지 않는경우

  //변할때마다.

  const changeOption = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const eText = (e.target as HTMLElement).textContent;
    // e.target.textContent
    // const selectValue =
    setSelected(eText);
    setDropDownOpen(false);
  };

  const openToggling = () => {
    setDropDownOpen(true);
    console.log(dropDownOpen);
    if (dropDownOpen) {
      setDropDownOpen(false);
    }
  };

  const autoCompleteDropDown = () => {
    //input값이 입력된경우 input 값에 따라서 dropdown을 보여줘야 한다
    // include => ['쿠팡','넷플릭스']


    const chooseList = newArr.filter((item: any) => {
      return item.sub_name.includes(inputValue);
    });
    console.log([...chooseList])
    //만약에 ㅋ 을 입력했으면,

    if (chooseList.length === 0) {


      setAuto(false);
      setUseSubscribe([...chooseList])
      console.log(useSubscribe, auto,chooseList);
    } else {
      setAuto(true);

      setUseSubscribe([...chooseList]);
    }
  };

  const changeInputValue = (e: React.FormEvent<HTMLDivElement>) => {
    const eText = (e.target as HTMLElement).textContent;

    setInputValue(eText);

    console.log(inputValue);
  };

  //ㅋ을 입력했을때 sub함수가 작동하여선 안된다.

  useEffect(() => {
      autoCompleteDropDown();

  }, [inputValue]);

  useEffect(() => {
    console.log(inputValue,'sub시작')
    
      axios
        .get(`${process.env.REACT_APP_API_URI}/wallet/subregist`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log("subscribes");
          setNewArr(res.data);
        })
        .catch((err) => {
          navigate("/");
        });
    
   

  }, []);

  //input이 없을때 구독목록을 불러와야한다
  //input이 존재하는데, 자동완성 조건이 완성되지 않는경우
  return (
    <div onClick={(e) => e.stopPropagation()} className="select_box">
      <div className="selected_value_box">
        <div
          suppressContentEditableWarning
          contentEditable
          onInput={changeInputValue}
          onClick={openToggling}
          placeholder="구독 서비스 정보를 입력해 주세요"
          className="selected_value"
        >
          {selected}
        </div>
        {/* <span></span> */}
      </div>
      {dropDownOpen || inputValue ? (
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
