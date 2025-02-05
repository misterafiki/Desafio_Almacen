'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import db from '../databases/connection.js';

class Loan extends Model {

}

Loan.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  destination:{
    type: DataTypes.STRING,
    allowNull: false,
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
  modelName: 'Loan',
  tableName: 'loans',
  timestamps: true,
  paranoid: true
});

export default Loan;