'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash('test@biztown.com', 10);
    await queryInterface.bulkInsert('Joueurs', [{
      id: '11111111-1111-1111-1111-111111111111',
      pseudo: 'Testeur',
      email: 'test@biztown.com',
      motDePasseHash: hash,
      patrimoine: 1000,
      classement: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Joueurs', null, {});
  }
}; 