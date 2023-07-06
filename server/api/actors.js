const express = require("express");
const { Casts } = require("../db");
const app = express.Router();

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    const actors = await Casts.findAll();
    res.send(actors);
  } catch (e) {
    next(e);
  }
});

app.get("/:id", async (req, res, next) => {
  try {
    const actor = await Casts.findByPk(req.params.id);

    if (!actor) {
      res.redirect("/PageNotFound");
      return;
    }
    res.send(actor);
  } catch (err) {
    next(err);
  }
});