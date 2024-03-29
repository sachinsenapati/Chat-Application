import React, { useState } from "react";
import "./registrationForm.css";
import { useDispatch } from "react-redux";
import { registrationApi } from "../../store/slice/registrationSlice";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data1 = await dispatch(registrationApi(data));
    if (data1) {
      console.log(data1);
      navigate("/");
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Enter Your Name"
        value={data.name}
        onChange={handleChange}
      />
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default RegistrationForm;
