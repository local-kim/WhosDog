'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "area2", {
      type: Sequelize.STRING(30),
      allowNull: true,
    });
    await queryInterface.addColumn("users", "area3", {
      type: Sequelize.STRING(30),
      allowNull: true,
    });
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
