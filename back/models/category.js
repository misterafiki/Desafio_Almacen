'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import db from '../databases/connection.js';

  class Category extends Model {
  
  }
  Category.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
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
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
    paranoid: true
  });
  export default Category;