var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).render("game");
});

module.exports = router;
