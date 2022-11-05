import React, { useState } from "react";
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
const MainPage = () => {

  return (
    <div className="MainPage">
      <MainPageContents1></MainPageContents1>
      <MainPageSlickList></MainPageSlickList>
      <MainPageContents2></MainPageContents2>
      <MainPageBoundary></MainPageBoundary>
      <MainPageContents3></MainPageContents3>
      <MainPageBoundary></MainPageBoundary>
      <MainPageContents4></MainPageContents4>
      <MainPageLoginBt></MainPageLoginBt>

      <BottomBar></BottomBar>
    </div>
  );
};

export default MainPage;
