export const passwordValidator = (password) => {
  if (password.match(/^[A-Za-z]\w{2,14}$/)) {
    return true;
  }
  return false;
};

export const usernameValidator = (username) => {
  if (username.match(/^[A-Za-z0-9_]{2,15}$/)) {
    return true;
  }
  return false;
};

export const emailValidator = (email) => {
  if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
    return true;
  }
  return false;
};
