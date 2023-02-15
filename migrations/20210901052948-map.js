'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("maps", "locationId", {
    type: Sequelize.STRING,
  })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("maps", "title")
  }
};
