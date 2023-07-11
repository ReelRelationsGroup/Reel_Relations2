import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/user";
import { logout } from "../store";
import { useNavigate } from "react-router-dom";
import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "../utils/util";

const EditAccount = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(auth.email ?? "");
  const [avatar, setAvatar] = useState(auth.avatar ?? "");
  const [username, setUsername] = useState(auth.username ?? "");
  const [password, setPassword] = useState("");
  const [passwordChange, setPasswordChange] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!auth.id) {
      alert("You Are Not Logged In!");
      return;
    }
    const id = auth.id;
    const data = {
      username,
      password,
      email,
      avatar,
    };
    if (passwordChange) {
      dispatch(updateUser({ data, id }));
    } else {
      delete data.password;
      dispatch(updateUser({ data, id }));
    }
    dispatch(logout());
    navigate("/");
  };

  const isEmailValid = emailValidator(email);
  const isPasswordValid = passwordValidator(password);
  const isUsernameValid = usernameValidator(username);

  useEffect(() => {
    if (!auth.id) {
      navigate("/");
    }
  }, [auth.id, navigate]);

  return (
    <div className="flex flex-col items-center justify-center text-slate-300">
      {auth.avatar && (
        <img
          src={auth.avatar}
          alt={auth.username.replace("Github-", "")}
          className="mx-1 my-1 h-14 w-14 rounded-full"
        />
      )}
      <h1 className="text-2xl my-4">Edit Account Info</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label className="block">Username</label>
          <input
            className="w-full p-2 text-black border border-gray-300 bg-white"
            placeholder="Edit Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {passwordChange ? (
          <div className="mb-4">
            <label className="block">Password</label>
            <input
              className="w-full p-2 border border-gray-300 bg-white text-black"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center">
              <button
                className="mt-4 border border-white text-white rounded flex items-center text-black min w-96 justify-center"
                onClick={() => {
                  setPasswordChange(false);
                  setPassword("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              className="mx-2 border border-white text-white rounded flex items-center text-black min w-96 justify-center mb-2"
              onClick={() => setPasswordChange(true)}
            >
              Change Password
            </button>
          </div>
        )}
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-2 border border-gray-300 bg-white text-black"
          />
          {!isEmailValid && (
            <div className="error-message">Invalid Email Format</div>
          )}
        </div>
        <div className="mb-4">
          <label>Avatar</label>
          <input
            type="file"
            onChange={handleAvatarChange}
            className="w-full p-2 border border-gray-300 bg-white text-black"
          />
        </div>
        <button
          disabled={passwordChange && !isPasswordValid}
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-2 mx-4 lg:mt-0"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditAccount;
