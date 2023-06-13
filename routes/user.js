var express = require("express");
var router = express.Router();
const users = require("../data/user.json");

const contoller = require("../controllers/user_game_controller");
const UserController = new contoller();

router.get("/", (req, res, next) => {
  res.status(200).send(users);
});

router.get("/dashboard", UserController.index);
router.get("/create", UserController.create);
router.get("/:id", UserController.show);
router.get("/:id/edit", UserController.edit);
router.get("/:id/delete", UserController.delete);

router.post("/create", UserController.store);
router.post("/:id/update", UserController.update);

module.exports = router;
