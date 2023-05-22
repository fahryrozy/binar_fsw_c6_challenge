var express = require("express");
var router = express.Router();
const users = require("../data/user.json");
const fs = require("fs");

router.get("/", (req, res, next) => {
  res.status(200).send(users);
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const newUser = { username, password };

  let appendUser = [];
  users.push(newUser);
  appendUser = users;

  const jsonData = JSON.stringify(appendUser, null, 2);

  fs.writeFileSync("data/user.json", jsonData, "utf8", (err) => {
    if (err) {
      res.redirect("error");
    }
  });

  res.redirect("/login");
});

module.exports = router;
