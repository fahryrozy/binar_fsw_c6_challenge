"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User, {
        constraints: false,
        foreignKey: "userId",
      });
    }
  }
  History.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      game: DataTypes.STRING,
      time: DataTypes.DATE,
      score: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "History",
      tableName: "user_game_history",
    }
  );

  return History;
};
