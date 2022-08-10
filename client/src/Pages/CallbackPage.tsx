import React, { useEffect } from "react";
import { isSigninState } from "utils/state";
import axios from "axios";
import { useNavigate } from "react-router";
// import { useNavigate } from 'react-router';

const CallbackPage = () => {
  // const navigate = useNavigate()

  const { persistLogin } = isSigninState();
  const url = new URL(window.location.href);
  const navigate = useNavigate();

  const searchs = url.search;

  useEffect(() => {
    if (url.pathname === "/callback/kakao") {
      const code: string | null = searchs.split("=")[1].split("&")[0];

      fetch(`${process.env.REACT_APP_API_URI}/auth/kakao`, {
        credentials: "include",
        method: "post",
        body: JSON.stringify({ code: code }),

        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res:any) => {
          if (!res.ok) {
            navigate("/login");

            persistLogin(false);

            throw new Error(res.status)

          }

          return res.json();
        })
        .then((data) => {
          navigate("/");

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem(
            "subgatherUserInfo",
            JSON.stringify(data.data)
          );
          persistLogin(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (url.pathname === "/callback/google") {
      const code: string | null = searchs.split("=")[1].split("&")[0];

      fetch(`${process.env.REACT_APP_API_URI}/auth/google`, {
        credentials: "include",
        method: "post",
        body: JSON.stringify({ code: code }),

        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res:any)=>{
        if(!res.ok){
          navigate("/login");

          persistLogin(false);
          throw new Error(res.status)
        }
        return res.json()

      })
        .then((data) => {

          
          navigate("/");

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem(
            "subgatherUserInfo",
            JSON.stringify(data.data)
          );
          persistLogin(true);
        })
        .catch((err) => {
          console.log(err);
       
        });
    }
  }, []);

  return <></>;
};

export default CallbackPage;
