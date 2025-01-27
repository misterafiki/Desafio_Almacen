'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('rolesasignados', {
      idra: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER, 
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE', // Opcional: Define qué sucede al actualizar/eliminar
        onDelete: 'CASCADE'
      },
      rol_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'roles'
          },
          key: 'id'
        },
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
