import {Sequelize} from 'sequelize';

import {Roles, User, User_role} from '../models/associations.js';

class ConexionUsers {

    constructor() {

    }

  addUser = async (body) => {
        let result = 0;
        try {
            result = await User.create(body);
        } catch (err) {
            if (err instanceof Sequelize.UniqueConstraintError) {
                console.log("Error: The user already exists in the database");
            } else {
                console.log("Error: Unknown error", err)
            }
            throw err;
        }
        return result;
  };

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

  updateUser = async (user, body) => {
    try {
        return await user.update(body);
    } catch (err) {
        throw err
    }
  }

  deleteUser = async (user) => {
    try {
        return await user.destroy();
    } catch (err) {
        throw err
    }
  }
}

export { ConexionUsers };
