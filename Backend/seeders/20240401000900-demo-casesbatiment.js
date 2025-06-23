'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CasesBatiments', [
      {
        id: '99999999-9999-9999-9999-999999999999',
        pos_x: 2,
        pos_y: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CasesBatiments', null, {});
  }
}; 