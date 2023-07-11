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
  const { user: currentUser } = useSelector((state) => state.auth) || {}; // Get the current user from the auth state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [avatar, setAvatar] = useState(currentUser?.avatar ?? "");
  const [username, setUsername] = useState(currentUser?.username ?? "");
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
    if (!currentUser) {
      alert("You Are Not Logged In!");
      return;
    }
    const id = currentUser.id;
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
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Edit Account Info</h2>
        <label>Username</label>
        <input value={username} onChange={handleUsernameChange} />
        {!isUsernameValid && (
          <div className="error-message">
            Invalid Username Format. Must Be 8-30 Characters Long & Start With A
            Letter.
          </div>
        )}
        {passwordChange ? (
          <div>
            <label>Password</label>
            <input value={password} onChange={handlePasswordChange} />
            <button onClick={() => setPasswordChange(false)}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setPasswordChange(true)}>
            Confirm Password Change
          </button>
        )}
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        {!isEmailValid && (
          <div className="error-message">Invalid Email Format</div>
        )}
        <label>Avatar</label>
        <input type="file" onChange={handleAvatarChange} />
        <button disabled={passwordChange && !isPasswordValid}>Submit</button>
      </form>
    </div>
  );
};

export default EditAccount;
