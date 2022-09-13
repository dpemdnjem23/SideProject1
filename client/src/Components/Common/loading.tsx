import React, { useState } from "react";

import '../../css/common/loading.css'

const Loading = () => {
  return (
    <div id='loading_background'>
      <span>Loading...</span>
      <img src="/Filled fading balls.gif"></img>
    </div>
  );
};
export default Loading;
