'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.addColumn("users", "longitude", {
      type: Sequelize.STRING(30),
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {},
};
