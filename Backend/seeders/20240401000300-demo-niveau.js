'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Niveaux', [
      {
        id: '33333333-3333-3333-3333-333333333333',
        niveau: 1,
        rendement: 10,
        tempsConstruction: 60,
        cout: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Niveaux', null, {});
  }
}; 