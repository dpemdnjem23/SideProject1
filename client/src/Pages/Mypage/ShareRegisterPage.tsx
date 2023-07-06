import CancellationButton from "Components/Common/cancellationButoon";
import RegistButton from "Components/Common/registButton";
import ShareRegistInfo from "Components/Mypage/mypageshare/shareregistInfo";
import ShareRegistBoard from "Components/Mypage/mypageshare/shareregistBoard";
import React, { useEffect } from "react";
import axios from "axios";
import "../../css/pages/ShareRegisterPage.css";
import {
  isSigninState,
  shareBoarduseStore,
  shareRegisteruseStore,
} from "utils/state";
import { useNavigate } from "react-router";
import { instance } from "App";
const ShareRegisterPage = () => {
  const { setUpdateWallet, updateWallet } = shareRegisteruseStore();
  const { shareBoard, shareTitle } = shareBoarduseStore();
  const accessToken: string | null = localStorage.getItem("accessToken");

  // useEffect(()=>{

  const navigate = useNavigate();

  const { persistLogin, userSignin } = isSigninState();

  const userinfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || "{}"
  );
  const today: number = Math.floor(Date.now() / 1000);

  useEffect(() => {
    if (userinfo.accessExp < today) {
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/auth/issueaccess`,
          {
            id: userinfo.id,
          },
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
          //         //res.data
          localStorage.setItem(
            "subgatherUserInfo",
            JSON.stringify(res.data.data)
          );

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.accessToken}`;
        })
        .catch((err) => {
          //refreshToken이 만료가된경우 로그아웃을 한다 -> 만료

          axios
            .get(`${process.env.REACT_APP_API_URI}/auth/signout`, {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            })

            .then((res) => {
              persistLogin(false);

              window.location.href = "/login";

              window.alert("로그인이 만료되었습니다. 다시 로그인해주세요");
              localStorage.clear();
              isSigninState.persist.clearStorage();
            })
            .catch((err) => {
              // console.error(err);

              persistLogin(false);

              localStorage.removeItem("accessToken");
              isSigninState.persist.clearStorage();
              localStorage.removeItem("subgatherUserInfo");
            });
        });
    }
  }, []);


  // console.log(shareBoard,shareTitle,updateWallet)

  const handleShareRegister = () => {
    instance
      .post(`${process.env.REACT_APP_API_URI}/share/register`, {
        description: shareBoard,
        title: shareTitle,
        list_sub: updateWallet,
      })

      .then((result) => {
        // console.log(result);

        navigate("/share");
      })
      .catch((err) => {
        alert("제목과 글을 입력해주세요");
        // console.log(err);
      });
  };

  // })

  //버튼을 누르면

  return (
    <div id="ShareRegisterPage">
      <ShareRegistInfo />
      <ShareRegistBoard />

      <div className="SharRegisterPage_bt">
        <CancellationButton />

        <div onClick={handleShareRegister} className="regist_bt_section">
          <span>등록하기</span>
        </div>
      </div>
    </div>
  );
};
export default ShareRegisterPage;
