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
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
