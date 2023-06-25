'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'facilities', {
      type: Sequelize.STRING(1000),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'facilities');
  },
};
