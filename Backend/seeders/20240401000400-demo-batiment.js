'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Batiments', [
      {
        id: '44444444-4444-4444-4444-444444444444',
        nom: 'Banque Centrale',
        type: 'Banque',
        plan: 'plan1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Batiments', null, {});
  }
}; 