'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Maps', 'title');
    await queryInterface.removeColumn('Maps', 'latitude');
    await queryInterface.removeColumn('Maps', 'longitude');
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
