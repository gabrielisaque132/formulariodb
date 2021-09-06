'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    tarefas: DataTypes.STRING,
    horaInica: DataTypes.FLOAT,
    horaFinal: DataTypes.FLOAT,
    difHora: DataTypes.FLOAT,
    peso: DataTypes.FLOAT,
    material: DataTypes.STRING,
    observacao: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};