import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
