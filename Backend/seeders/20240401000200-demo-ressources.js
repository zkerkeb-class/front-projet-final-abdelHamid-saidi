'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ressources', [
      {
        id: '22222222-2222-2222-2222-222222222222',
        type: 'BizCoins',
        nom: 'BizCoin',
        prix: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '22222222-2222-2222-2222-222222222223',
        type: 'Énergie',
        nom: 'Électricité',
        prix: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ressources', null, {});
  }
}; 