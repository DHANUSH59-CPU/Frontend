import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { SignupForm } from "./Pages/SignupForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
