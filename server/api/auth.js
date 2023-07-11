const express = require("express");
const app = express.Router();
const { User } = require("../db");

module.exports = app;

app.post("/", async (req, res, next) => {
  try {
    res.send(await User.authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get("/github", async (req, res, next) => {
  try {
    const token = await User.authenticateGithub(req.query.code);
    res.send(`
      <html>
        <body>
          <script>
            window.localStorage.setItem('token', '${token}');
            window.location = '/';
          </script>
        </body>
      </html>
    `);
  } catch (ex) {
    next(ex);
  }
});

app.get("/", async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      console.log("User Not Authenticated");
      return res.status(401).send("User Not Logged In");
    }
    const user = await User.findByToken(req.headers.authorization, {
      attributes: ["id", "username", "email", "createdAt", "isAdmin", "avatar"],
    });
    if (!user) {
      console.log("User Not Authenticated");
      return res.status(401).send("User Not Logged In");
    }
    res.send(user);
  } catch (ex) {
    if (ex.message === "Bad Credentials") {
      console.log("User Not Authenticated");
      return res.status(401).send("User Not Logged In");
    }
    next(ex);
  }
});
