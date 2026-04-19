import React from "react";
import {useNavigate} from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/patient/dashboard");
  };
  return(
    <div>
      <h2>Continue your Care</h2>
      <input placeholder="Email" />
      <input placeholder="Password" type="password" />

      <button onClick={handleLogin}>Login</button>
      <button onClick={()=> navigate("/register")}>New user? Register</button>
    </div>
  )
};

export default Login;