import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/Pages/Sign-in";
import Home from "./components/Pages/Home";
import DashBoard from "./components/Pages/DashBoard";
import Products from "./components/Pages/Products";
import ChangePassword from "./components/Pages/ChangePassword";
import Register from "./components/Pages/Register";
import { useState } from "react";
import UserContext from "./components/context";
import Footer from "./components/Footer";
import Cookies from "universal-cookie";
import PrivateRoute from "./components/PrivateRoute";
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

            <Route
              path="/products"
              element={<PrivateRoute auth={user.isLogged} />}
            >
              <Route path="/products" element={<Products />} />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
