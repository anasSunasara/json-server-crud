import React, { useState } from "react";
import Allroute from "./route/Allroute";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Allroute />
        {/* <Ascent_decent/> */}
        {/* <Filter/> */}
        {/* <Sort/> */}
        {/* <Pginationjs/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
