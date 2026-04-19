import React from "react";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return(
    <div>
      <h2>Register</h2>
      <input placeholder="Name" />
      <input placeholder="Email" />
      <input placeholder="Password" type="password" />

      <button onClick={()=> navigate("/login")}>Register</button>
    </div>
  )
};

export default Register;