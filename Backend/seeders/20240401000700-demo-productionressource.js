'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ProductionRessources', [
      {
        id: '77777777-7777-7777-7777-777777777777',
        quantite: 50,
        tempsProduction: 120,
        niveauId: '33333333-3333-3333-3333-333333333333',
        recepteurId: '22222222-2222-2222-2222-222222222222',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProductionRessources', null, {});
  }
}; 