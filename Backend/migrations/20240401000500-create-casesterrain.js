'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CasesTerrains', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      pos_x: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pos_y: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      joueurId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Joueurs', key: 'id' },
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
    await queryInterface.dropTable('CasesTerrains');
  }
}; 