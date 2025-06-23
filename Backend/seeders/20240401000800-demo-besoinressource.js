'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('BesoinRessources', [
      {
        id: '88888888-8888-8888-8888-888888888888',
        quantite: 20,
        niveauId: '33333333-3333-3333-3333-333333333333',
        productionRessourcesId: '77777777-7777-7777-7777-777777777777',
        recepteurId: '22222222-2222-2222-2222-222222222223',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('BesoinRessources', null, {});
  }
}; 