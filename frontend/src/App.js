import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Firstdis from "./components/firstdis";
import Fnc from "./components/fnc";
import Register from "./components/Register";
import Pyv from "./components/Pyv";
import Rcu from "./components/Rcu";
import Ydr from "./components/ydr";
import Login from "./components/Login";
import Account from "./components/Account";
import Diagnostic_center_Page from "./pages/Diagnostic_center_Page";
import {
  Personalinformation,
  Familymembers,
  Billingandpayments,
  Yourvisits,
} from "./components/Account";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState("Diagnostic_center");
  const [isLoggedin, setIsLoggedin] = useState(false);

  function updateUser(userData) {
    setUser(userData);
    setIsLoggedin(true);
  }

  return (
    <Router>
      {/* {user?.type === "Diagnostic_center" ? ( */}
        <Routes>
          <Route path="/*" element={<Diagnostic_center_Page />} />
        </Routes>
      {/* ) : (
        <div>
          <div id="topblock"></div>
          <Navbar isLoggedin={isLoggedin} />
          <Routes>
            <Route path="/" element={<Firstdis />} />
            <Route path="/fnc" element={<Fnc isLoggedin={isLoggedin} />} />
            <Route path="/pyv" element={<Pyv />} />
            <Route path="/ydr" element={<Ydr />} />
            <Route path="/rcu" element={<Rcu />} />
            <Route
              path="/register"
              element={
                <Register updateUser={updateUser} isLoggedin={isLoggedin} />
              }
            />
            <Route path="/login" element={<Login pr={updateUser} />} />
            <Route
              path="/account"
              element={
                <Account updateUser={updateUser} isLoggedin={isLoggedin} />
              }
            >
              <Route
                path="personalinformation"
                element={<Personalinformation />}
              />
              <Route path="familymembers" element={<Familymembers />} />
              <Route
                path="billingandpayments"
                element={<Billingandpayments />}
              />
              <Route path="yourvisits" element={<Yourvisits />} />
            </Route>
          </Routes>
        </div>
      )} */}
    </Router>
  );
}

export default App;
