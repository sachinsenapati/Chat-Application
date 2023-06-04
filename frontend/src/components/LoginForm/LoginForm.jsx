import React, { useState, useEffect } from "react";
import "./loginForm.css";
import { useDispatch, useSelector } from "react-redux";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginApi(data));
  };

  const response = useSelector((state) => state.user.user);

  useEffect(() => {
    if (response.status) {
      navigate("/");
    }
  }, [response, navigate]);

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
