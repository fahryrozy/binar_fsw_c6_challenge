var express = require("express");
var router = express.Router();
const users = require("../data/user.json");

router.get("/", (req, res, next) => {
  res.status(200).render("login");
});

router.post("/", function (req, res, next) {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.redirect("/play");
  } else {
    res.redirect("/login/unauthorized");
  }
});

router.get("/unauthorized", (req, res, next) => {
  res.status(401).render("unauthorized");
});

module.exports = router;
