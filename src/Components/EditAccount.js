import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/user";
import { logout } from "../store";
import { useNavigate } from "react-router-dom";

const EditAccount = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState(auth.username);
  const [password, setPassword] = useState("");
  const [passwordChange, setPasswordChange] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const id = auth.id;
    if (passwordChange) {
      const data = {
        username,
        password,
      };
      dispatch(updateUser({ data, id }));
    } else {
      const data = {
        username,
      };
      dispatch(updateUser({ data, id }));
    }
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center text-slate-300">
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
        <div className="flex justify-center">
          <button
            className="border border-white text-white rounded flex items-center text-black min w-96 justify-center mb-2"
            disabled={passwordChange && password === ""}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAccount;
