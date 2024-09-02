import React from "react";
import { Route, Routes } from "react-router-dom";
import Ascent_decent from "../componennts/postjson/Ascent_decent";
import Add_post from "../componennts/postjson/Add_post";
import Edit_post from "../componennts/postjson/Edit_post";

function Allroute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Ascent_decent />} />
        <Route path="/add_post" element={<Add_post />} />
        <Route path="/Edit_post/:id" element={<Edit_post />} />
      </Routes>
    </>
  );
}

export default Allroute;
