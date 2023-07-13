import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { attemptLogin } from "../store";
import { addUserProfile } from "../store/user.js";
import {
  usernameValidator,
  passwordValidator,
  emailValidator,
} from "../utils/util";
import { GithubIcon } from "lucide-react";

const LoginRegister = (props) => {
  const handleLoginFromCheckout = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let auth = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = async (ev) => {
    ev.preventDefault();
    const response = await dispatch(attemptLogin(credentials)).then(
      (result) => {
        if (result.payload.id) {
          navigate("/");
        } else if (response.error) {
          setError(response.payload.message);
        }
      }
    );
  };

  const register = async (ev) => {
    ev.preventDefault();

    if (!username || !password || !email) {
      setError("Username, password, and email are required.");
      return;
    }

    if (!usernameValidator(username)) {
      setError("Must be 3-15 characters long and no special characters");
      return;
    }

    if (!passwordValidator(password)) {
      setError(
        "Must start with a letter and be 3-15 characters long and no special characters"
      );
      return;
    }

    if (!emailValidator(email)) {
      setError("Invalid email format.");
      return;
    }

    const newUser = {
      username,
      password,
      email,
      isAdmin: false,
      place: {},
      avatar: "",
    };

    try {
      await dispatch(addUserProfile(newUser));

      const loginCredentials = {
        username,
        password,
      };

      const response = await dispatch(attemptLogin(loginCredentials));

      if (response.payload.id) {
        setUsername("");
        setPassword("");
        setEmail("");
        handleLoginFromCheckout();
        navigate("/");
      } else if (response.error) {
        setError(response.payload.message);
      }
    } catch (error) {
      setError("Error occurred during registration.");
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center w-full h-60px">
      <div className="border rounded-lg w-full px-15 max-w-xs loginRegister">
        <h1 className="text-slate-300 mx-4 font-bold text-xl">Sign in</h1>
        <div className="text-slate-300 mx-4 mt-1 mb-2 text-md">
          to continue to Reel Relations
        </div>
        <div className="loginRegisterBox">
          <h3 className="text-slate-300 mt-3 mx-4">Returning Users</h3>
          <hr className="formDivider" />
          <form onSubmit={login}>
            {auth.error === true && (
              <div>
                <p className="text-orange-300">
                  Invalid Username And/Or Password!
                </p>
              </div>
            )}
            <div className="inputContainer flex flex-col">
              <input
                className="text-sm placeholder-gray-500 bg-white text-black p-1 mb-2"
                placeholder="username"
                value={credentials.username}
                name="username"
                onChange={onChange}
              />
              <input
                className="text-sm placeholder-gray-500 bg-white text-black p-1 mb-2"
                placeholder="password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
              <button className="border-2 ml-5 w-60 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="loginRegisterBox mt-1">
          <h3 className="text-slate-300 mx-4">New Users</h3>
          <hr className="formDivider" />
          <form onSubmit={register}>
            <div className="inputContainer flex flex-col">
              <input
                className="text-sm placeholder-gray-500 bg-white text-black p-1 mb-2"
                placeholder="username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                className="text-sm placeholder-gray-500 bg-white text-black p-1 mb-2"
                placeholder="password"
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <input
                className="text-sm placeholder-gray-500 bg-white text-black p-1 mb-2"
                placeholder="email"
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button className="border-2 ml-5 w-60 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white">
                Register
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center my-1">
          <hr className="flex-grow border-t border-gray-300 mr-3" />
          <span className="text-white">or</span>
          <hr className="flex-grow border-t border-gray-300 ml-3" />
        </div>
        <div className="ml-9 w-60 flex justify-center mt-6">
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${window.CLIENT_ID}`}
            className="border border-2 border-white rounded flex items-center p-2 min w-96 justify-center hover:text-teal-200 hover:border-teal-200"
          >
            <span className="text-black mr-2 opacity-100 hover:text-teal-200">
              <GithubIcon size={24} className="text-white opacity-100" />
            </span>
            <span className="text-white opacity-100 ml-3 hover:text-teal-200">
              Continue with Github
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
