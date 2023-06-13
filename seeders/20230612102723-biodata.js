"use strict";

/** @type {import('sequelize-cli').Migration} */
const config = require("../config/config");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      { schema: config.development.schema, tableName: "user_game_biodata" },
      [
        {
          id: 1,
          name: "John Doe",
          email: "jhondoe@gmail.com",
          createdAt: Sequelize.fn("NOW"),
          updatedAt: Sequelize.fn("NOW"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      { schema: config.development.schema, tableName: "user_game_biodata" },
      null,
      {}
    );
  },
};
