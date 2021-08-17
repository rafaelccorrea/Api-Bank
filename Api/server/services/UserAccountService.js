import database from '../src/models';

class UserAccountService {

  static async CreateAccount(id, data) {
    try{
      return await database.UserAccount.create(data)
    }catch(err){
      throw err;
    }
  }

  static async getById(id){

    try {
      return await database.UserAccount.findOne({
        where: {userId: Number(id)},
      });
    } catch (error) {
      throw error;
    }

  }

  static async getByIds(id){

    try {
      return await database.UserAccount.findOne(id);
    } catch (error) {
      throw error;
    }

  }

  static async getAll(){
    try {
      return await database.UserAccount.findAll();
    }catch(error){
      throw error;
    }
  }

  static async delete(id){
    try{
      const account = await database.UserAccount.findByPk(id);
      if(account){
        const deleteAccount = await database.UserAccount.destroy({
          where: { id: Number(id) },
        });
        return deleteAccount;
      }
    }catch (error){
      throw error;
    }
  }

  static async update(id, updateAccounts){
    try{
      const account = await database.UserAccount.findByPk(id);

      if (account) {

        const updateAccount = await database.UserAccount.update(
          updateAccounts,
          {
            where: { id: Number(id) },
            returning: true,
            plain: true,
          }
        );
        return updateAccount[1];
      }
      return null;
    }catch (error) {
      throw error;
    }
  }

}

export default UserAccountService;
