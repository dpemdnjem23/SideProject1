import React from "react";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import logo from "./logo.svg";
import Modal from "./Components/common/modal/modal";

import "./App.css";

function App() {
  const [modalOPen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-mainHeader">
          {/* 로그인 모달창 */}
          <Modal />
        </div>
      </header>
    </div>
  );
}

export default App;
