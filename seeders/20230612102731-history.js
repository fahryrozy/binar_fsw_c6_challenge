"use strict";

/** @type {import('sequelize-cli').Migration} */
const config = require("../config/config");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      { schema: config.development.schema, tableName: "user_game_history" },
      [
        {
          userId: 1,
          game: "rock-paper-scissors",
          time: Sequelize.fn("NOW"),
          score: "WIN",
          createdAt: Sequelize.fn("NOW"),
          updatedAt: Sequelize.fn("NOW"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      { schema: config.development.schema, tableName: "user_game_history" },
      null,
      {}
    );
  },
};
