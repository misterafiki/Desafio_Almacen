import {Op, Sequelize} from 'sequelize';
import bcrypt from 'bcrypt';
import {Roles, User, User_role} from '../models/associations.js';
import Role from "../models/role.js";

class ConexionUsers {

    constructor() {

    }

    addUser = async (body) => {
        body.password = await bcrypt.hash(body.password, 10);
        let result = 0;
        let transaction;

        try {
            const existingUser = await User.findOne({
                where: { email: body.email }
            });

            if (existingUser) {
                throw new Error('El correo electrónico ya está en uso');
            }

            transaction = await User.sequelize.transaction();
            result = await User.create(body, { transaction });

            const role = await Role.findOne({
                where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), body.role.toLowerCase())
            });

            if (role) {
                await User_role.create({
                    user_id: result.id,
                    rol_id: role.id
                }, { transaction });
            } else {
                throw new Error("Role not found.");
            }

            await transaction.commit();
        } catch (err) {
            if (transaction) await transaction.rollback();

            if (err instanceof Sequelize.UniqueConstraintError) {
                console.log("Error: The user already exists in the database");
            } else {
                console.log("Error: Unknown error", err);
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
