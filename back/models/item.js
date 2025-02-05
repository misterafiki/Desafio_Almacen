'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import db from '../databases/connection.js';

class Item extends Model {

}

Item.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  internal_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  category_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'Category',
      key: 'id'
    }
  },
  description:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  brand:{
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
  modelName: 'Item',
  tableName: 'items',
  timestamps: true,
  paranoid: true
});

export default Item;