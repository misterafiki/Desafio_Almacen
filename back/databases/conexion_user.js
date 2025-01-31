import { Sequelize } from 'sequelize';

import { User_role, User, Roles } from '../models/associations.js';

import db from './connection.js';

class ConexionUsers {

    constructor() {

    }

  getUserByEmail = async (email) => {
    try {
        const result = await User.findOne({
            where: {
                email: email,
            },
            include: [
                {
                    model: User_role,
                    as: 'User_roles',
                    include: [
                        {
                            model: Roles,
                            as: 'Rol',
                            attributes :['id','name']
                        },
                    ],
                },
            ],
        });

        if (!result) {
            throw new Error('Usuario no encontrado');
        }

        return result;
    } catch (err) {
        throw err;
    }
};

  getUsers = async () => {
    try {
      let result = await User.findAll();
  
      if (!result) {
        throw new Error('Usuario no encontrado');
      }
  
      return result;
    } catch (err) {
      throw err;
    }
  }

  getUserById = async (id) => {
    try {
      let result = await User.findByPk(id,{
        include: [
          {
              model: User_role,
              as: 'User_roles',
              include: [
                  {
                      model: Roles,
                      as: 'Rol',
                      attributes :['id','name']
                  },
              ],
          },
      ],
      });
      if (!result) {
        throw new Error('Usuario no encontrado');
      }
  
      return result;
    } catch (err) {
      throw err
    }
  }

  updateUser = async (user, updateUser) => {
    try {
      let result = await user.update(updateUser);
  
      return result;
    } catch (err) {
      throw err
    }
  }

  deleteUser = async (user) => {
    try {
      let result = await user.destroy();

      return result;
    } catch (err) {
      throw err
    }
  }
  changeImg = async (user, imge) => {
    try{
      const img = {img:imge};
      let result = await user.update(img);
      
      return result;
    } catch (err){
      throw err
    }
  };
  
}

export { ConexionUsers };
