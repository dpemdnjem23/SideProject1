import React from "react";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import logo from "./logo.svg";
import Modal from "./Components/common/modal/signinmodal";

import "./App.css";

function App() {

  
  
  return (
    <div className="App">
     <Modal />
      <header className="App-header">
    
        <div className="App-mainHeader">
          {/* 로그인 모달창 */}
        
        </div>
      </header>
    </div>
  );
}

export default App;
