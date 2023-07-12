import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/user";
import { logout } from "../store";
import { useNavigate } from "react-router-dom";
import defAvatar from "../Components/Navbar";
import {
  passwordValidator,
  usernameValidator,
  emailValidator,
} from "../utils/util";

const EditAccount = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState(auth.username);
  const [email, setEmail] = useState(auth.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(auth.avatar);
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const id = auth.id;

    // Validate password
    if (!passwordValidator(password)) {
      setPasswordError(
        "Must start with a letter and be 3-15 characters long and no special characters"
      );
      return;
    }

    // Validate username
    if (!usernameValidator(username)) {
      setUsernameError(
        "Must be 3-15 characters long and no special characters"
      );
      return;
    }

    // Validate email
    if (!emailValidator(email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords must match");
      return;
    }

    const data = {
      username,
      email,
      password,
      avatar,
    };
    dispatch(updateUser({ data, id }));
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center text-slate-300">
      {auth.avatar && (
        <img
          src={auth.avatar ? auth.avatar : defAvatar}
          alt={auth.username.replace("Github-", "")}
          className="mx-1 my-1 h-12 w-12 rounded-full"
        />
      )}
      <h1 className="text-2xl my-4">Edit Account Info</h1>
      <form
        onSubmit={handleSubmit}
        className="border rounded-lg w-full max-w-xs p-4"
      >
        {/* Form fields */}
        <div className="mb-4">
          <label className="block ml-2">Set Username</label>
          <input
            className="italic w-full p-2 text-black border border-gray-300 bg-white"
            placeholder="Edit Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && (
            <div className="text-xs text-error">{usernameError}</div>
          )}

          <label className="ml-2 mt-1 block">Set Email</label>
          <input
            className="italic w-full p-2 text-black border border-gray-300 bg-white"
            placeholder="Edit Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <div className="text-xs text-orange-300 text-error">
              {emailError}
            </div>
          )}

          <label className="block ml-2">Set Avatar URL</label>
          <input
            className="italic w-full p-2 text-black border border-gray-300 bg-white"
            placeholder="Edit Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block ml-2">New Password</label>
          <input
            className="italic w-full p-2 border border-gray-300 bg-white text-black"
            placeholder="Enter New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <div className="text-xs text-orange-300 text-error">
              {passwordError}
            </div>
          )}

          <label className="block mt-1 ml-2">Confirm New Password</label>
          <input
            className="italic w-full p-2 border border-gray-300 bg-white text-black"
            placeholder="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordError && (
            <div className="text-xs text-orange-300 text-error">
              {passwordError}
            </div>
          )}
        </div>

        {/* Submit button */}
        <div className="text-sm">Confirm Password To Proceed</div>
        <div className="flex justify-center">
          <button
            className="border border-white text-white rounded flex items-center text-black min w-96 justify-center"
            disabled={
              password === "" ||
              confirmPassword === "" ||
              passwordError ||
              usernameError ||
              emailError
            }
          >
            Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAccount;
