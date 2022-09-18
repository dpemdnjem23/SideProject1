import React, { useState } from "react";
import { useWalletStore } from "utils/state";

import "../../../css/components/MyPage/MypageShare/shareregistInfo.css";



type subInfo = {
  id: number;
  // image?: string;
  name: string;
  // cost?: number;
  // cycleDay?:number;
  // cycleMonth?:number;

  // cycleYear?:number;
  // start_date?:string;
  // end_datae?:string;
  // updatedAt?:string;
  // createdAt?:string

  // user_id?:number;
};



const ShareRegistInfo = () => {
  //구독 정보 를 불러모으는 버튼이 있다.
  // 버튼을 누를시 구독정보를 불러오고 불러오는동안 대기화면 표시
  // 구독정보를 불러오고 싶지 않을수 있으니 버튼을 누르지 않으면 그냥 글만 쓸수 있다
  // 이를 안내할만한 것들을 모달창을 띄우든 버튼 클릭시 안내가 필요하다.

  const [button, setButton] = useState<boolean>(true);
  const { walletInfo, setWalletInfo } = useWalletStore();

  const [newArr, setNewArr] = useState<subInfo[]>([]);


  const importData = () => {
    setButton(false);
    setNewArr(walletInfo)

    console.log(walletInfo)

    
  };

  const deleteData = () => {
    setButton(true);
  };

  const updateWalletInfo = (e:any) =>{

    


//해당되는 id만 요소에서 제거해준다.

const chooseList = newArr.filter((item)=>{
  return item.id!==e
})

setNewArr([...chooseList])
console.log(chooseList)

    //새로 만들어서 , 복사를 해서 제거하도록한다
    //다시클릭시 원상복구 

    

  }


  return (
    <div className="ShareRegistInfo_section">
      <div className="ShareRegistInfo_section_sub">
        <span className="ShareRegistInfo_section_title">구독 공유하기</span>

        <p className="ShareRegistInfo_section_title2">
          구독 공유를 위해 나의 구독 정보를 모으고, 글을 남겨주세요!
        </p>
      </div>

      <div className="ShareRegistInfo_section_sub2">
        {button ? (
            <button onClick={importData}>구독 불러오기</button>
        ) : (
          <div className="ShareRegistInfo_subscribe_section">

            {newArr.map((el) => {
              return (
                <div key={el.id}>
                  <span onClick = {() =>updateWalletInfo(el.id)}  >{el.name} X</span>
                </div>
              );
            })}

          </div>


        )}
      </div>

      {button ? 

     null: <button onClick={deleteData}>되돌아 가기</button>}

    </div>
  );
};

export default ShareRegistInfo;
