'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import db from '../databases/connection.js';

class State extends Model {

}

State.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  item_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
    eferences: {
      model: 'Item',
      key: 'id'
    }
  },
  loan_id: {  
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'Loan',
      key: 'id',
    },
  },
  location: {
    type: DataTypes.STRING,
  },
  observation:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  current_owner:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  serial_number:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  low_reason:{
    type: DataTypes.STRING,
    allowNull: true
  },
  verified_by:{
    type: DataTypes.BIGINT,
    allowNull: true,
    eferences: {
      model: 'User',
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: db,
  modelName: 'State',
  tableName: 'states',
  timestamps: true,
  paranoid: true
});

export default State;