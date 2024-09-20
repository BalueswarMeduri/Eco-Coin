import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Loginsign.css";
import { login, register as signUpRequest } from "../../connecting";
import { login as stateLogin } from "../../store/userData";
import { useDispatch } from "react-redux";

const Loginsign = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  // Watch for password to compare with confirm password
  const password = watch("password");

  // Function to toggle between Login and Sign Up forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
    reset(); // Reset form on toggle
  };

  const onLoginSubmit = async (data) => {
    try {
      const res = await login(data);
      toast.success("Login successful!", {
        style: { backgroundColor: "green", color: "white" },
      });
      Dispatch(stateLogin(res.message.user));
      navigate("/Home");
    } catch (err) {
      setErrorMessage("Incorrect username or password.");
      toast.error(err, {
        style: { backgroundColor: "#9c0e03", color: "white" },
      });
    }
  };

  const onSignUpSubmit = async (data) => {
    data.fullName = data.userName
    //console.log(data);
    
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!", {
        style: { backgroundColor: "#9c0e03", color: "white" },
      });
      return;
    }

    try {
      const res = await signUpRequest(data);
      toast.success("Sign-up successful!", {
        style: { backgroundColor: "green", color: "white" },
      });
      //navigate("/Home");
    } catch (err) {
      setErrorMessage("Failed to create account. Please try again.");
      toast.error(err, {
        style: { backgroundColor: "#9c0e03", color: "white" },
      });
    }
  };

  return (
    <div className={`form-container ${isLogin ? "login" : "signup"}`}>
      <p className="title">{isLogin ? "Login" : "Sign Up"}</p>
      <form
        className="form"
        onSubmit={
          isLogin ? handleSubmit(onLoginSubmit) : handleSubmit(onSignUpSubmit)
        }
      >
        {!isLogin && (
          <>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="userName"
                id="name"
                placeholder="Enter your name"
                {...register("userName", { required: true })}
              />
              {errors.name && <span className="error">Name is required</span>}
            </div>
            <div className="input-group">
              <label htmlFor="gender">Gender</label>
              <div className="gender-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    {...register("gender", { required: true })}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    {...register("gender", { required: true })}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    {...register("gender", { required: true })}
                  />
                  Other
                </label>
              </div>
              {errors.gender && (
                <span className="error">Gender is required</span>
              )}
            </div>
          </>
        )}
        <div className="input-group">
          <label htmlFor="username">Email Id</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.username && (
            <span className="error">Username is required</span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="password">
            {isLogin ? "Password" : "Create Password"}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder={isLogin ? "Enter your password" : "Create a password"}
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="error">Password is required</span>
          )}
        </div>
        {!isLogin && (
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
              <span className="error">Confirm password is required</span>
            )}
          </div>
        )}
        {isLogin && (
          <div className="login-options">
            <div className="forgot">
              <a rel="noopener noreferrer" href="#">
                Forgot Password?
              </a>
            </div>
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
          </div>
        )}
        <button type="submit" className="sign">
          {isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <p className="signup">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <a
          onClick={toggleForm}
          rel="noopener noreferrer"
          href="#"
          className="singuplogin"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </a>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Loginsign;
