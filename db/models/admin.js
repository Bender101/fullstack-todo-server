'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    name: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};
