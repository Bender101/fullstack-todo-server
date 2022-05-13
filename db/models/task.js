"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // define association here
    }
  }
  Task.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      text: DataTypes.TEXT,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
