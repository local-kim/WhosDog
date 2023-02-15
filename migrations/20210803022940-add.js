'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("posts", "like", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue:0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("posts", "img")
  }
};
