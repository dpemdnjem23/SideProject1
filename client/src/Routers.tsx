import RegisterPage from "Pages/ReigstPage";
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const Routers = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/subregist" element={RegisterPage}></Route>
          {/* <Route path='/' element={}></Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Routers;
