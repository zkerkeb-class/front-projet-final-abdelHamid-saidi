'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CasesTerrains', [
      {
        id: '55555555-5555-5555-5555-555555555555',
        pos_x: 0,
        pos_y: 0,
        joueurId: '11111111-1111-1111-1111-111111111111',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CasesTerrains', null, {});
  }
}; 