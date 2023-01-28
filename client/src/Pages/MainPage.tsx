import React, { useState, useEffect } from "react";
import { Routes, BrowserRouter, Link } from "react-router-dom";
import MainPageContents1 from "Components/Main/MainPageContents1";
import MainPageSlickList from "Components/Main/MainPageSlickList";
import BottomBar from "Components/Common/footer";

import "../css/pages/MainPage.css";
import MainPageLoginBt from "Components/Main/MainPageLoginBt";
import MainPageContents2 from "Components/Main/MainPageContents2";
import MainPageBoundary from "Components/Main/MainPageBoundary";
import MainPageContents3 from "Components/Main/MainPageContents3";
import MainPageContents4 from "Components/Main/MainPageContents4";
import MainPageContents5 from "Components/Main/MainPageContents5";
import MainPageMobile2 from "Components/Main/MainPageMobile2";
import MainPageMobile3 from "Components/Main/MainPageMobile3";
import MainPageMobile4 from "Components/Main/MainPageMobile4";

const MainPage = () => {
  const [match, setMatch] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:768px)");
    setMatch(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setMatch(e.matches);

    mediaQuery.addEventListener("change", listener);
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  return (
    <div className="MainPage">
      <MainPageContents1></MainPageContents1>
      <MainPageSlickList></MainPageSlickList>

      {match ? (
        <MainPageMobile2></MainPageMobile2>
      ) : (
        <MainPageContents2></MainPageContents2>
      )}

      <MainPageBoundary></MainPageBoundary>
      {match ? (
        <MainPageMobile3></MainPageMobile3>
      ) : (
        <MainPageContents3></MainPageContents3>
      )}

      <MainPageBoundary></MainPageBoundary>

      {match ? (
        <MainPageMobile4></MainPageMobile4>
      ) : (
        <MainPageContents4></MainPageContents4>
      )}

      <MainPageBoundary></MainPageBoundary>
      <MainPageContents5></MainPageContents5>

      <MainPageLoginBt></MainPageLoginBt>

      <BottomBar></BottomBar>
    </div>
  );
};

export default MainPage;
