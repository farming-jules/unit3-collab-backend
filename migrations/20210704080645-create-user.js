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
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      passwordHash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dateOfBirth: {
        allowNull: false,
        type: Sequelize.DATE
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sexualOrientation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      passion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lookingFor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Bio: {
        allowNull: false,
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