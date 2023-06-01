import { instance } from "App";
import React, { useEffect, useState } from "react";
import {
  shareCarduseStore,
  shareRegisteruseStore,
  useWalletStore,
} from "utils/state";

interface Item {
  id: number;
  list_sub: string;
}

import "../../../css/components/MyPage/MypageShare/shareEditInfo.css";

const ShareEditinfo = () => {
  //구독 정보 를 불러모으는 버튼이 있다.
  // 버튼을 누를시 구독정보를 불러오고 불러오는동안 대기화면 표시
  // 구독정보를 불러오고 싶지 않을수 있으니 버튼을 누르지 않으면 그냥 글만 쓸수 있다
  // 이를 안내할만한 것들을 모달창을 띄우든 버튼 클릭시 안내가 필요하다.

  const [button, setButton] = useState<boolean>(true);
  const { walletInfo, setWalletInfo } = useWalletStore();
  const { setUpdateWallet, updateWallet } = shareRegisteruseStore();
  const { shareInfo, cardIndex, clickModalNum, setCardModal, cardModal } =
    shareCarduseStore();
  // const [newArr, setNewArr] = useState<subInfo[]>([]);

  const share = JSON.parse(localStorage.getItem("share") || "{}");

  //구독 공유 접속하면 구독 목록을 불러올 데이터를 생성
  useEffect(() => {
    instance
      .get(`/wallet/info`)
      .then((res) => {
        setWalletInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    const chooseList = walletInfo.filter((item, id) => {
      console.log(id, item.name, share.list_sub.list_sub);
      return item.name === share.list_sub.list_sub[id];
    });
    
    setUpdateWallet([...chooseList]);
  }, []);
  //


  const importData = () => {
    setButton(false);
    setUpdateWallet(walletInfo);

    console.log(walletInfo);
  };

  const deleteData = () => {
    setButton(true);
  };

  const updateWalletInfo = (e: any) => {
    //해당되는 id만 요소에서 제거해준다.

    const chooseList = updateWallet.filter((item) => {
      return item.id !== e;
    });

    setUpdateWallet([...chooseList]);

    //새로 만들어서 , 복사를 해서 제거하도록한다
    //다시클릭시 원상복구
  };

  //   const handleChange =() =>{

  //   }

  return (
    <div className="ShareRegistInfo_section">
      <div className="ShareRegistInfo_section_sub">
        <span className="ShareRegistInfo_section_title">구독 공유하기</span>

        <p className="ShareRegistInfo_section_title2">
          구독 공유를 위해 나의 구독 정보를 모으고, 글을 남겨주세요!
        </p>
        <div className="ShareEditInfo_section_caution">
          *수정사항에서 구독 불러오기를 사용하면 초기화가 됩니다.
          <br></br>기존의 구독을 사용하고자 한다면 수정만 하시면됩니다.*
        </div>
      </div>

      <div className="ShareRegistInfo_section_sub2">
        {button ? (
          <button onClick={importData}>구독 불러오기</button>
        ) : (
          <div className="ShareRegistInfo_subscribe_section">
            {updateWallet.map((el) => {
              return (
                <div key={el.id}>
                  <span onClick={() => updateWalletInfo(el.id)}>
                    {el.name} X
                  </span>
                </div>
              );
            })}
          </div>
        )}
        {button ? (
          <div className="ShareEditInfo_section_sub">
            <div className="ShareEditInfo_section_sub_title">
              <div>현재 나의 구독</div>
              <div>*나의 구독만 표시할뿐 수정되지 않습니다.</div>
            </div>
            <div className="ShareEditInfo_section_mySubscribe">
              {share.list_sub.list_sub.map((el: string[], index: number) => {
                return (
                  <div key={index}>
                    <span>{el}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      {button ? null : <button onClick={deleteData}>되돌아 가기</button>}
    </div>
  );
};

export default ShareEditinfo;
