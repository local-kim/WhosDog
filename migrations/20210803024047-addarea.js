'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("posts", "area1", {
      type: Sequelize.STRING(30),
      allowNull: true,
    });
    await queryInterface.addColumn("posts", "area2", {
      type: Sequelize.STRING(30),
      allowNull: true,
    });
    await queryInterface.addColumn("posts", "area3", {
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
