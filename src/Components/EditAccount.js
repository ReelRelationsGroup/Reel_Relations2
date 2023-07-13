import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/user";
import { updateAvatar } from "../store/auth";
import { logout } from "../store";
import { useNavigate } from "react-router-dom";
import {
  passwordValidator,
  usernameValidator,
  emailValidator,
} from "../utils/util";

const EditAccount = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const el = useRef();

  const [username, setUsername] = useState(auth.username);
  const [email, setEmail] = useState(auth.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [avatar, setAvatar] = useState(auth.avatar);
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  // for uploading avatar
  useEffect(() => {
    if (el.current) {
      el.current.addEventListener("change", (ev) => {
        const file = ev.target.files[0];
        const reader = new FileReader(); // built-in browser API
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
          dispatch(updateAvatar({ avatar: reader.result }));
          ev.target.value = ""; // if there is an empty file
          console.log("reader.result"); // this is the base64 encoded image
          window.location.reload();
        });
      });
    }
  }, [el]);

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
    navigate("/");
    dispatch(updateUser({ data, id }));
    dispatch(logout());
  };

  return (
    <div className="flex flex-col items-center justify-center text-slate-300">
      {/* {auth.avatar && (
        <img
          src={auth.avatar ? auth.avatar : defAvatar}
          alt={auth.username.replace("Github-", "")}
          className="mx-1 my-1 h-12 w-12 rounded-full"
        /> */}
      {/* )} */}
      {auth.avatar && (
        <img
          className="mx-1 my-1 h-12 w-12 rounded-full"
          src={auth.avatar}
          alt={auth.username}
        />
      )}

      <h1 className="text-2xl my-1">Edit Account Info</h1>
      <form
        onSubmit={handleSubmit}
        className="border rounded-lg w-full px-15 max-w-xs"
      >
        {/* Form fields */}
        <div className="mb-2">
          <label className="block ml-2">Set Username</label>
          <input
            className="text-sm italic w-full p-2 text-black border border-gray-300 bg-white"
            placeholder="Edit Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && (
            <div className="text-xs text-error">{usernameError}</div>
          )}

          <label className="ml-2 mt-1 block">Set Email</label>
          <input
            className="text-sm italic w-full p-2 text-black border border-gray-300 bg-white"
            placeholder="Edit Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <div className="text-xs text-orange-300 text-error">
              {emailError}
            </div>
          )}

          <label className="block ml-2 mt-1">Upload Avatar</label>
          {/* <input
            className="italic w-full p-2 text-black border border-gray-300 bg-white"
            placeholder="Edit Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          /> */}

          <input
            className="text-sm italic w-full p-2 text-black border border-gray-300 bg-white"
            type="file"
            ref={el}
          />
          {auth.avatar ? (
            <button
              onClick={() => dispatch(updateAvatar({ avatar: null }))}
              className={
                "mx-2 text-sm flex justify-center items-center rounded-sm text-white border-2 border-slate-400 focus:outline-none focus:border-white hover:text-teal-200"
              }
            >
              Remove Avatar
            </button>
          ) : null}
        </div>
        <div className="mb-2">
          <label className="block ml-2">New Password</label>
          <input
            className="italic w-full p-2 text-sm border border-gray-300 bg-white text-black"
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
            className="italic text-sm w-full p-2 border border-gray-300 bg-white text-black"
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
        <div className="text-sm item-center flex justify-center">
          Input Password To Proceed
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="flex justify-center items-center mx-3 rounded-sm text-white min w-96 block border-2 border-slate-400 focus:outline-none focus:border-white hover:text-teal-200"
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
