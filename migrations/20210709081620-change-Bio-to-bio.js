'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'Bio', 'bio')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'bio', 'Bio')
  }
};
