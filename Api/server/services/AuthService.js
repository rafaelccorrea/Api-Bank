import { Op } from 'sequelize';
import database from '../src/models';

class AuthService {
  static async signin(login) {
    try {
      return await database.User.findOne({
        where: {
          [Op.or]: [{ email: login }, { cpf: login }, { cellphone: login }],
        },
        raw: true,
      });
    } catch (error) {
      throw error;
    }
  }

  static async signup(user) {
    try {
      return await database.User.create(user);
    } catch (error) {
      throw error;
    }
  }

  static async update(id, updateUsers){
    try{
      const account = await database.User.findByPk(id);

      if (account) {

        const updateUser = await database.User.update(
          updateUsers,
          {
            where: { id: Number(id) },
            returning: true,
            plain: true,
          }
        );
        return updateUser[1];
      }
      return null;
    }catch (error) {
      throw error;
    }
  }

}

export default AuthService;
