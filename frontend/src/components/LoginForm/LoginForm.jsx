import React, { useState } from "react";
import "./loginForm.css";
import { useDispatch } from "react-redux";
import { loginApi } from "../../store/slice/loginSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data1 = await dispatch(loginApi(data));
    if (data1) {
      navigate("/");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Enter Your Email"
        value={data.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter Your Password"
        value={data.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
