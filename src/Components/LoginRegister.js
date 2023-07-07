import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { attemptLogin } from "../store";
import { addUserProfile } from "../store/user.js";
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
  const [error, setError] = useState("");

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = async (ev) => {
    ev.preventDefault();
    const response = await dispatch(attemptLogin(credentials)).then(
      (result) => {
        if (response.error) {
          setError(response.payload.message);
        } else {
          result.payload.id, navigate("/");
        }
      }
    );
  };

  const register = async (ev) => {
    ev.preventDefault();
    await dispatch(addUserProfile({ username, password, permissions: false }));
    credentials.username = username;
    credentials.password = password;
    dispatch(attemptLogin(credentials));
    setUsername("");
    setPassword("");
    handleLoginFromCheckout;
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center w-full h-60px">
      <div className="loginRegister">
        <h1 className="text-slate-300 mx-4 text-2xl">Sign in</h1>
        <h2 className="text-slate-300 mx-4 mt-1 mb-5 text-lg">
          to continue to Reel Relations
        </h2>
        <div className="loginRegisterBox">
          <h3 className="text-slate-300 mx-4">Returning Users</h3>
          <hr className="formDivider" />
          <form onSubmit={login}>
            {auth.error === true && (
              <div>
                <p className="text-slate-300 mx-4">
                  Invalid Username And/Or Password!
                </p>
              </div>
            )}
            <div className="inputContainer">
              <input
                className="placeholder-gray-500 bg-white text-black p-1"
                placeholder="username"
                value={credentials.username}
                name="username"
                onChange={onChange}
              />
              <input
                className="placeholder-gray-500 bg-white text-black p-1"
                placeholder="password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
              <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 mx-4 lg:mt-0">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="loginRegisterBox">
          <h3 className="text-slate-300 mx-4">New Users</h3>
          <hr className="formDivider" />
          <form onSubmit={register}>
            <div className="inputContainer">
              <input
                className="placeholder-gray-500 bg-white text-black p-1"
                placeholder="username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                className="placeholder-gray-500 bg-white text-black p-1"
                placeholder="password"
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 mx-4 lg:mt-0">
                Register
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300 mr-3" />
          <span className="text-white my-5">or</span>
          <hr className="flex-grow border-t border-gray-300 ml-3" />
        </div>
        <div className="flex justify-center mt-6">
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${window.CLIENT_ID}`}
            className="border border-white rounded flex items-center text-black p-2 min w-96 justify-center"
          >
            <GithubIcon size={24} className="mr-2 text-white opacity-100" />
            <span className="text-white opacity-100 ml-3">
              Continue with Github
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
