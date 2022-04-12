import React, { FC } from "react";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import logo from "./logo.svg";
import Modal from "./Components/common/modal/signinmodal";
import "./css/reset.css";

import "./App.css";
import Mainheader from "Components/common/mainHeader";
const App = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  //modal을 클릭했을때 modal창이 뜯
  const openmodal = () => {
    setShowModal(true);
  };

  return (
    <div className="App">
      {showModal ? <Modal setShowModal={setShowModal} /> : null}

      <header className="App-header">
        <Mainheader />
        <button onClick={openmodal}>modal</button>

        <div className="App-mainHeader">{/* 로그인 모달창 */}</div>
      </header>
    </div>
  );
};

export default App;
