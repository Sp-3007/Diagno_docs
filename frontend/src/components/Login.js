import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import axios from "axios";

async function sendTokenToBackendLogin(idToken) {
  const backendUrl = "http://localhost:3001/credential/login"; // Replace with your backend URL
  try {
    const response = await axios.post(
      backendUrl,
      {}, // No body needed if you just need to send the token
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    console.log("Token sent successfully to backend for login:", response.data);
    return response.data; // Return the response data for further use
  } catch (error) {
    console.error("Error sending token to backend:", error);
    // Log additional details if needed
    if (error.response) {
      console.error("Server responded with status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error(
        "Request was made but no response received:",
        error.request
      );
    } else {
      console.error("Error setting up the request:", error.message);
    }
    return {}; // Return an empty object in case of error
  }
}

function Login({ pr }) {
  const [formdata, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  }

  async function handleLogin() {
    const { email, password } = formdata;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        const idToken = await user.getIdToken();
        localStorage.setItem("jwtToken", idToken);
        const response = await sendTokenToBackendLogin(idToken);

        if (response.userType === "Diagnostic_center") {
          pr({ type: "Diagnostic_center" });
          alert("Login successful. Redirecting to Diagnostic Center page...");
          navigate("/diagnostic-center-page"); // Redirect to Diagnostic Center page
        } else {
          navigate("/"); // Redirect to default page for non-diagnostic users
        }
      } else {
        await signOut(auth);
        alert("Please verify your email first.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(`Login failed: ${error.message}`);
    }
  }

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      localStorage.setItem("jwtToken", idToken);
      const response = await sendTokenToBackendLogin(idToken);

      if (response.userType === "diagnostic_center") {
        pr({ type: "Diagnostic_center" });
        alert("Login successful. Redirecting to Diagnostic Center page...");
        navigate("/diagnostic-center-page"); // Redirect to Diagnostic Center page
      } else {
        navigate("/"); // Redirect to default page for non-diagnostic users
      }
    } catch (error) {
      console.error("Google Sign-In error:", error);
      alert(`Google Sign-In failed: ${error.message}`);
    }
  }

  function handlePasswordReset() {
    const { email } = formdata;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent. Please check your email.");
      })
      .catch((error) => {
        console.error("Password reset error:", error);
        alert(`Password reset failed: ${error.message}`);
      });
  }

  return (
    <div className="login-container">
      <div id="inner-login">
        <h1>Sign In</h1>
        <input
          id="email"
          type="text"
          placeholder="Email"
          value={formdata.email}
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={formdata.password}
          onChange={handleChange}
        />
        <a id="forgot-link" onClick={handlePasswordReset}>
          Forgot Password? Click to reset
        </a>
        <button className="btn" id="submit" type="button" onClick={handleLogin}>
          Submit
        </button>
        <p>
          <span>or</span>
        </p>
        <Link id="redirect" to="/register">
          <button className="btn" id="sign-up">
            Sign Up
          </button>
        </Link>
        <div id="google">
          <button
            className="google-btn"
            type="button"
            onClick={handleGoogleSignIn}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
