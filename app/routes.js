/** @format */

const route = require("express").Router();

route.get("/health", (req, res) => {
  res.status(200).json({ msg: "Success" });
});

module.exports = route;
