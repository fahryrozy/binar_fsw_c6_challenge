const { raw } = require("express");
const models = require("../models");

class UserGameController {
  // view
  async index(req, res) {
    const listOfUSerGames = await models.User.findAll();

    if (!listOfUSerGames) {
      return res.send("No Data, please run the migration first");
    }

    return res.render("dashboard/", {
      data: listOfUSerGames,
    });
  }

  async create(req, res) {
    return res.render("dashboard/create");
  }

  async edit(req, res) {
    const { id } = req.params;
    const userGame = await models.User.findOne({
      where: {
        id: id,
      },
    });
    const userBio = await models.Biodata.findOne({
      where: {
        id: id,
      },
      attributes: { exclude: ["id"] },
    });
    return res.render("dashboard/edit", {
      user: {
        id: userGame.id,
        name: userBio.name,
        username: userGame.username,
        email: userBio.email,
        password: userGame.password,
      },
    });
  }

  async show(req, res) {
    const { id } = req.params;
    const userGame = await models.User.findOne({
      include: [
        {
          model: models.Biodata,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
      ],
      where: {
        id: id,
      },
      raw: true,
    });

    return res.render("dashboard/view", {
      user: userGame,
    });
  }

  // action
  async store(req, res) {
    const { username, password, name, email } = req.body;
    const latestUser = await models.User.findOne({
      order: [["createdAt", "DESC"]],
    });
    const user = await models.User.create({
      username: username,
      password: password,
    });
    if (user) {
      const bio = await models.Biodata.create({
        id: user.id,
        name: name,
        email: email,
      });
    }
    return res.redirect("/user/dashboard");
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, username, email, password } = req.body;

    const user = await models.User.update(
      {
        username,
        password,
      },
      {
        where: {
          id,
        },
      }
    );

    if (user) {
      const bio = await models.Biodata.update(
        {
          name,
          email,
        },
        {
          where: {
            id,
          },
        }
      );
    }

    return res.redirect("/user/dashboard");
  }

  async delete(req, res) {
    const { id } = req.params;

    await models.User.destroy({
      where: {
        id,
      },
    });

    await models.Biodata.destroy({
      where: {
        id,
      },
    });

    return res.redirect("/user/dashboard");
  }
}

module.exports = UserGameController;
