'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('UserImages', 'UserId', { type: Sequelize.INTEGER })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('UserImages', 'UserId')
  }
};
