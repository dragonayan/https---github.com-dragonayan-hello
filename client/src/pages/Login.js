import { Button, Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import {useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useState } from "react";
function Login() {
  const[loading,setloading] =useState(false);
  
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setloading(true);
      
      const response = await axios.post("/api/user/login", values);
   
      setloading(false);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setloading(false)
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication" style={{ backgroundImage: "url('https://ik.imagekit.io/wnn5dux89/i1.jpg?updatedAt=1688845031574')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div
        className="background-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
        }}
      ></div>
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          

          
          <Button className="primary-button my-2 full-width-button" htmlType="submit">
            LOGIN
          </Button>

          <Link to="/register" className="anchor mt-2">
            CLICK HERE TO REGISTER
          </Link>
         
        </Form>
      </div>
    </div>
  );
}

export default Login;
