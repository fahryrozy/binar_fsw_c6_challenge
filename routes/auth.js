const fs = require("fs");
var express = require("express");
var router = express.Router();

const users = require("../data/user.json");

router.get("/login", (req, res, next) => {
  return res.status(200).render("login");
});

router.post("/login", function (req, res, next) {
  const { username, password } = req.body;

  const userIndex = users.findIndex(
    (u) => u.username === username && u.password === password
  );

  if (userIndex == -1) {
    return res.redirect("/auth/unauthorized");
  }

  const userLogin = users[userIndex];

  req.session.User = userLogin;

  console.log("session => ", req.session);

  if (userLogin.role == "superuser") {
    return res.redirect("/user/dashboard");
  } else {
    return res.redirect("/play");
  }
});

router.get("/unauthorized", (req, res, next) => {
  return res.status(401).render("unauthorized");
});

router.get("/register", (req, res) => {
  return res.render("register");
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const newUser = { username, password, role: "user" };

  let appendUser = [];
  users.push(newUser);
  appendUser = users;

  const jsonData = JSON.stringify(appendUser, null, 2);
  console.log("sdsasa => ", jsonData);
  fs.writeFileSync("data/user.json", jsonData, "utf8", (err) => {
    if (err) {
      res.redirect("error");
    }
  });

  return res.redirect("/auth/login");
});

module.exports = router;
