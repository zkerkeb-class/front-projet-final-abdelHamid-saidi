'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Niveaux', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      niveau: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      rendement: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      tempsConstruction: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cout: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Niveaux');
  }
}; 