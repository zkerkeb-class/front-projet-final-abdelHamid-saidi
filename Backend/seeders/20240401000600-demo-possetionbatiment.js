'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('PossetionBatiments', [
      {
        id: '66666666-6666-6666-6666-666666666666',
        pos_x: 1,
        pos_y: 1,
        niveauId: '33333333-3333-3333-3333-333333333333',
        joueurId: '11111111-1111-1111-1111-111111111111',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PossetionBatiments', null, {});
  }
}; 