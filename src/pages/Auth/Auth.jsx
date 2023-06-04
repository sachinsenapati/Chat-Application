import React, { useState } from "react";
import "./auth.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

const Auth = () => {
  const [activeForm, setActiveForm] = useState("registration");

  const handleTabClick = (formName) => {
    setActiveForm(formName);
  };

  return (
    <div className="chatauth">
      <div className="chatName">
        <h1>Chat Application</h1>
      </div>

      <div className="auth">
        <div className="tab-container">
          <div
            className={`tab ${activeForm === "registration" ? "active" : ""}`}
            onClick={() => handleTabClick("registration")}
          >
            <span>Registration</span>
          </div>
          <div
            className={`tab ${activeForm === "login" ? "active" : ""}`}
            onClick={() => handleTabClick("login")}
          >
            <span>Login</span>
          </div>
        </div>

        <div className="form-container">
          <div className="form-wrapper">
            <div className="form-header">
              {activeForm === "registration" ? (
                <h2>Create an Account</h2>
              ) : (
                <h2>Login to Your Account</h2>
              )}
            </div>
            <div className="form-content">
              {activeForm === "login" ? <LoginForm /> : <RegistrationForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
