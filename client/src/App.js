import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/Pages/Sign-in";
import Home from "./components/Pages/Home";
import DashBoard from "./components/Pages/DashBoard";
import Blog from "./components/Pages/Blog";
import ChangePassword from "./components/Pages/ChangePassword";
import Register from "./components/Pages/Register";
import React, { useState } from "react";
import UserContext from "./components/context";
import Footer from "./components/Footer";
import Cookies from "universal-cookie";
import PrivateRoute from "./components/PrivateRoute";
import BlogForm from "./components/Pages/BlogForm";
import { Toaster } from "react-hot-toast";
const cookies = new Cookies();

// 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

function App() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    isLogged: cookies.get("token") ? true : false, // isVerified: "",
  });
  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Toaster toastOptions={{ duration: 2000 }} />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route
              path="/dash-board"
              element={<PrivateRoute auth={user.isLogged} />}
            >
              <Route path="/dash-board" element={<DashBoard />} />
            </Route>

            <Route path="/blog" element={<PrivateRoute auth={user.isLogged} />}>
              <Route path="/blog" element={<Blog />} />
            </Route>
            <Route
              path="/new-blog"
              element={<PrivateRoute auth={user.isLogged} />}
            >
              <Route path="/new-blog" element={<BlogForm />} />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route
              path="*"
              element={
                <div
                  style={{
                    padding: 2,
                    // marginLeft: 20,
                    margin: "20px 20px",
                    textAlign: "center",
                  }}
                >
                  404 Page Not Found
                </div>
              }
            />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
