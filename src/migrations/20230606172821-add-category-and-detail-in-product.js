'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'category', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('products', 'detailProduct', {
      type: Sequelize.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'category');
    await queryInterface.removeColumn('products', 'detailProduct');
  },
};
