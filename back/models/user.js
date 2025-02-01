'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';
import db from '../databases/connection.js';

class User extends Model {
  getUserInfo() {
    return {
      email: this.email,
      name: this.name,
      img: "https://res.cloudinary.com/du572yhof/image/upload/v1738353776/imgs/"+this.img || null 
    };
  }

}

User.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  img:{
    type: DataTypes.STRING,
    defaultValue:null,
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
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  paranoid: true
});

export default User;