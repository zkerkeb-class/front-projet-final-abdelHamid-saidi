'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductionRessources', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      quantite: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      tempsProduction: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      niveauId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Niveaux', key: 'id' },
        onDelete: 'CASCADE'
      },
      recepteurId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Ressources', key: 'id' },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('ProductionRessources');
  }
}; 