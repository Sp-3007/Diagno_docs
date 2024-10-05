import React, { useState } from "react";
import "../styles/Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


function Register(props) {
  const [formData, setFormData] = useState({});
  const [selectedValue, setSelectedValue] = useState("user");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleChange(e) {
    const newdata = { ...formData };
    newdata[e.target.name] = e.target.value;
    setFormData(newdata);
  }

  function handleRadioChange(e) {
    setSelectedValue(e.target.value);
    console.log("Selected user type:", e.target.value);
  }

  function validateForm() {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }
    if (
      !formData.email ||
      !formData.mobileNumber ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill out all required fields.");
      return false;
    }
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number.");
      return false;
    }
    return true;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          password
        );
        const user = userCredential.user;
        await sendEmailVerification(user);

        // Send the JWT token and user role to your backend
        const idToken = await user.getIdToken();
        const finalData = { ...formData, password, userType: selectedValue };

        await sendTokenToBackend_register(idToken, finalData);

        alert("Successfully registered. Please verify your email.");
      } catch (error) {
        console.error("Error registering user:", error);
        alert(error.message);
      }
    }
  }

  const checkEmailVerification = async (user) => {
    try {
      await user.reload();
      return user.emailVerified;
    } catch (error) {
      console.error("Error checking email verification:", error);
      return false;
    }
  };

  async function sendTokenToBackend_register(idToken, finalData) {
    const backendUrl = "http://localhost:3001/credential/register"; // Replace with your backend URL
    await axios
      .post(
        backendUrl,
        {
          idToken,
          mobileNumber: finalData.mobileNumber,
          userType: finalData.userType,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      )
      .then((response) => {
        console.log(
          "Token sent successfully to backend for registration:",
          response
        );
      })
      .catch((error) => {
        console.error("Error sending token to backend:", error);
      });
  }

  return (
    <div id="registerdiv">
      <div id="rleft">
        <div id="rcontent">
          <h3 style={{ fontSize: "5vh", color: "rgb(79,82,142)" }}>
            <strong>Diagno Doc</strong>
          </h3>
          <h3 style={{ fontSize: "4vh" }}>Get Started Now</h3>
        </div>
        <div id="choice">
          <div>
            <input
              type="radio"
              id="user"
              name="userType"
              value="user"
              checked={selectedValue === "user"}
              onChange={handleRadioChange}
            />
            <label htmlFor="user" className="lchoice">
              User
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="diagnosticCenter"
              name="userType"
              value="diagnosticCenter"
              checked={selectedValue === "diagnosticCenter"}
              onChange={handleRadioChange}
            />
            <label htmlFor="diagnosticCenter" className="lchoice">
              Diagnostic Center
            </label>
          </div>
        </div>

        <div id="rform">
          <div className="rformfield">
            <label htmlFor="email">
              <strong>Email Address</strong>
            </label>
            <br />
            <br />
            <input
              type="text"
              id="remailinp"
              onChange={handleChange}
              name="email"
            />
            <br />
            <br />
          </div>
          <div className="rformfield">
            <label htmlFor="mobileNumber">
              <strong>Mobile Number</strong>
            </label>
            <br />
            <br />
            <input
              type="text"
              id="rmobilenumberinp"
              onChange={handleChange}
              name="mobileNumber"
              placeholder="Enter your 10-digit number"
            />
            <br />
            <br />
          </div>
          <div className="rformfield">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <br />
            <br />
            <input
              type="password"
              id="rpasswordinp"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <br />
            <br />
          </div>
          <div className="rformfield">
            <label htmlFor="confirmPassword">
              <strong>Confirm Password</strong>
            </label>
            <br />
            <br />
            <input
              type="password"
              id="rconfirmpasswordinp"
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
            />
            <br />
            <br />
          </div>
          <button id="registerbutton" onClick={onSubmit}>
            Register
          </button>
          <div id="redirect">
            <p>
              Have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Register;
