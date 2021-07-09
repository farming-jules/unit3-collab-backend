'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'name', {
      allowNull: true,
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('Users', 'dateOfBirth', {
      allowNull: true,
      type: Sequelize.DATE
    })
    await queryInterface.changeColumn('Users', 'gender', {
      allowNull: true,
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('Users', 'sexualOrientation', {
      allowNull: true,
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('Users', 'passion', {
      allowNull: true,
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('Users', 'lookingFor', {
      allowNull: true,
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('Users', 'location', {
      allowNull: true,
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('Users', 'Bio', {
      allowNull: true,
      type: Sequelize.TEXT
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'name', {
      allowNull: false,
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('Users', 'dateOfBirth', {
      allowNull: false,
      type: Sequelize.DATE
    })
    await queryInterface.changeColumn('Users', 'gender', {
      allowNull: false,
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('Users', 'sexualOrientation', {
      allowNull: false,
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('Users', 'passion', {
      allowNull: false,
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('Users', 'lookingFor', {
      allowNull: false,
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('Users', 'location', {
      allowNull: false,
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('Users', 'Bio', {
      allowNull: false,
      type: Sequelize.TEXT
    })
  }
};
