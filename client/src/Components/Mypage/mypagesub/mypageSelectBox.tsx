import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router";

// ../../../../public/subscribes/네이버 플러스.png

type subInfo = {
  id?: number;
  image?: string | undefined;
  sub_name?: string;
  inpuValue?: string;
};

import "../../../css/components/MyPage/MypageSub/mypageSelectBox.css";
import { registSubInfoState, showDropDownList } from "utils/state";
import { instance } from "App";

const MypageSelectBox = () => {
  // const {subName} = e.target as HTMLElement

  const { setDropDownOpen, dropDownOpen } = showDropDownList();

  // const navigate = useNavigate()
  const accessToken: string | null = localStorage.getItem("accessToken");
  const { setSelected, selected } = registSubInfoState();

  const [useSubscribe, setUseSubscribe] = useState<subInfo[]>([]);
  // const [useSubscribe, setUseSubscribe] = useState<any>([]);

  const [newArr, setNewArr] = useState<subInfo[]>([]);
  //autocomplete
  //hastext는 input 값 유무
  //inputValue state 는 input갑스이 상태를 확인
  const [inputValue, setInputValue] = useState<string | null>(null);
  //input값을 포함하는 autocomplete 추천 항목 리스트를 확인
  const [auto, setAuto] = useState<boolean>(false);

  //인풋밸류가 , 자동완성이 안된경우, 존재하지 않는경우

  const changeOption = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const eText = (e.target as HTMLElement).textContent;
    // e.target.textContent
    // const selectValue =
    setSelected(eText);
    setDropDownOpen(false);
  };

  const openToggling = () => {
    setDropDownOpen(true);

    if (dropDownOpen) {
      setDropDownOpen(false);
    }
  };

  const autoCompleteDropDown = () => {
    //input값이 입력된경우 input 값에 따라서 dropdown을 보여줘야 한다
    // include => ['쿠팡','넷플릭스']

    const chooseList = newArr.filter((item: subInfo) => {
      return item.sub_name?.includes(inputValue as string);
    });

    //만약에 ㅋ 을 입력했으면,

    if (chooseList.length === 0) {
      setAuto(false);
      setUseSubscribe([...chooseList]);
    } else {
      setAuto(true);

      setUseSubscribe([...chooseList]);
    }
  };

  const changeInputValue = (e: React.FormEvent<HTMLDivElement>) => {
    const eText = (e.target as HTMLElement).textContent;
    setDropDownOpen(true);
    setInputValue(eText);
  };

  console.log(newArr)


  //ㅋ을 입력했을때 sub함수가 작동하여선 안된다.

  useEffect(() => {
    autoCompleteDropDown();
  }, [inputValue]);

  useEffect(() => {
    console.log('진압해')
    instance
      .get(`/wallet/subregist`, {})

      .then((result) => {

        console.log(result.data)
        setNewArr(result.data.data);
        setUseSubscribe(result.data.data);
      })
      .catch((err) => {
        // console.log(err);
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
      {dropDownOpen ? (
        <ul onClick={changeOption} className="option_list">
          {useSubscribe.map((el: subInfo) => {
            return (
              <li key={el.id} className="option">
                <img src={el.image}></img>
                <div>{el.sub_name}</div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default MypageSelectBox;
