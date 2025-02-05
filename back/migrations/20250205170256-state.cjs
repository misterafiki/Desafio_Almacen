'use strict';

const { TableHints } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('states', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
        references: {
          model: {
            tableName: 'Item',
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      loan_id: {  
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model:{
            tableName: 'Loan'
          }, 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      location: {
        type: Sequelize.STRING,
      },
      observation:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      current_owner:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      serial_number:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      low_reason:{
        type: Sequelize.STRING,
        allowNull: true
      },
      verified_by:{
        type: Sequelize.BIGINT,
        allowNull: true,
        eferences: {
          model: {
            tableName:'User',
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('states');
  }
};
