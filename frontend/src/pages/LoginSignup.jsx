import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginSignup = () => {
  const [state, setState] = useState("Signup");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login function called", formData);
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem("token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const signup = async () => {
    console.log("Signup function called", formData);
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem("token", responseData.token);
        window.location.reload("/");
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-pink-300 flex items-center justify-center">
      <div className="bg-white md:w-[40%] md:h-[60%] sm:w-[45%] sm:h-[60%] p-4 w-[70%] h-[65%] rounded-tl-3xl rounded-br-3xl">
        <h1 className="sm:text-2xl text-xl font-bold text-center">{state}</h1>
        <div className="p-4">
          {state === "Signup" && (
            <input
              value={formData.name}
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleInputChange}
              className="border-2 rounded-tl-xl rounded-br-xl w-full border-pink-200 p-2 m-1 h-10"
            />
          )}
          <input
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            placeholder="Email Address"
            className="border-2 rounded-tl-xl rounded-br-xl w-full border-pink-200 p-2 m-1"
          />
          <input
            type="password"
            value={formData.password}
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
            className="border-2 rounded-tl-xl rounded-br-xl w-full border-pink-200 p-2 m-1"
          />
        </div>

        {state === "Signup" ? (
          <p className="text-center m-4 -ml-3 mt-10 w-full text-xs">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span
                className="text-red-600 hover:text-red-400 font-semibold cursor-pointer"
                onClick={() => setState("Login")}
              >
                Log In
              </span>
            </Link>
          </p>
        ) : (
          <p className="text-center m-4 -ml-4 mt-10 w-full text-xs">
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span
                className="text-red-600 hover:text-red-400 font-semibold cursor-pointer"
                onClick={() => setState("Signup")}
              >
                Sign Up
              </span>
            </Link>
          </p>
        )}

        <div className="flex items-center justify-center w-[90%] m-auto">
          <input type="checkbox" className="cursor-pointer" />
          <p className="pl-3 text-xs">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        <div className="flex items-center justify-end w-[90%]">
          <button
            onClick={() => {
              state === "Login" ? login() : signup();
            }}
            className="w-[30%] min-w-fit h-10 sm:mt-10 text-center p-2 m-1 bg-pink-400 rounded-tl-xl text-white rounded-br-xl hover:text-pink-400 hover:bg-white hover:border-2 hover:border-pink-400 duration-500 hover:scale-105 text-sm"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
