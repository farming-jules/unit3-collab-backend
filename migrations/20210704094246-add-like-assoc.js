'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Likes', 'OwnerId', { type: Sequelize.INTEGER })
    await queryInterface.addColumn('Likes', 'TargetId', { type: Sequelize.INTEGER })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Likes', 'OwnerId', { type: Sequelize.INTEGER })
    await queryInterface.removeColumn('Likes', 'TargetId', { type: Sequelize.INTEGER })
  }
};
