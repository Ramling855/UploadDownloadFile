import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate("");
  const ChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onLoginClick = () => {
    axios
      .post("http://localhost:9013/login", data)
      .then((res) => {
        console.log(res.data);
        setFlag(res);
        console.log(flag);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/home");
  };

  return (
    <div className="container row">
      <div className="col-sm-7 offset-2 mt-5">
        <h5 className=" alert alert-info text-center">Login</h5>
        <hr />
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter Email Here"
              onChange={ChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter Password Here"
              onChange={ChangeHandler}
            />
          </div>

          <button type="button" className="btn btn-dark" onClick={onLoginClick}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
