'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tarefas: {
        type: Sequelize.STRING
      },
      horaInica: {
        type: Sequelize.FLOAT
      },
      horaFinal: {
        type: Sequelize.FLOAT
      },
      difHora: {
        type: Sequelize.FLOAT
      },
      peso: {
        type: Sequelize.FLOAT
      },
      material: {
        type: Sequelize.STRING
      },
      observacao: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};