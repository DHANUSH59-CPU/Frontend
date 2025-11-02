import "./App.css";
import { Route, Routes, Navigate } from "react-router";
import { useEffect } from "react";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { SignupForm } from "./Pages/SignupForm";
import { useAppDispatch, useAppSelector } from "@/store/appStore";
import { authenticateUser } from "@/store/authSlice";
import Profile from "./Pages/Profile";
import Loader from "@/components/kokonutui/loader";
import Match from "./Pages/Match";
import About from "./Pages/About";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((s) => s.authSlice);

  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader title="Checking your session..." subtitle="Loading" />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/" /> : <SignupForm />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/match"
              element={isAuthenticated ? <Match /> : <Navigate to="/login" />}
            />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
