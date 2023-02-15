'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('losts', {
      file_name: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      page_url: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('losts');
  }
};