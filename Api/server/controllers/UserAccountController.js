import { UserAccountService, AuthService } from '../services';
import { Request } from '../utils';
import { UserAccountValidation}  from '../Validations'

const request = new Request();

class UserAccount {

  static async CreateAccount(req,res){

    try{

      await UserAccountValidation.UserAccount.validate(req.body, { abortEarly: false })

      const userId = req.dataReq.id

      const existAccount = await UserAccountService.getByIds({
        where: {userId: userId}
      })

      if(existAccount) {
        request.setError('Este usuário já tem Conta Bancaria cadastrada', 400)
        return request.send(res);
      }

      const account = await UserAccountService.CreateAccount(userId,{
        ...req.body,
        userId: req.dataReq.id,
        legal_name: req.dataReq.name,
        bank_code: '345'
      })

      await AuthService.update(userId, {
        accountId: account.id
      })

      console.log(account)

      if (account) {
        request.setSuccess(200, "Conta Bancaria criada com sucesso", account);
      } else request.setError("Não foi possível criar conta bancaria");
      return request.send(res);
    } catch (error) {
      console.log(error);
      request.setError(error);
      return request.send(res);
    }

  }

  static async getAccountById(req,res){

    try {

      const account = await UserAccountService.getById(req.dataReq.id);

      if (account) { request.setSuccess(200, 'Conta Bancaria consultada com sucesso', account); } else return res.send({message: 'Conta Bancaria inexistente', status: 'error'});

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }

  }

  static async getAllAccounts(req, res) {
    try {
      const accounts = await UserAccountService.getAll();

      if (accounts) {
        request.setSuccess(200, "Contas bancarias consultadas com sucesso", accounts);
      } else request.setError("Não foi possível consultar as contas bancarias");
      return request.send(res);
    }catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }


  static async deleteAccount(req, res) {
    try {
      const accountId = req.dataReq.accountId;

      await UserAccountValidation.deleteAccount.validate(
        { id: accountId },
        {
          abortEarly: false,
        }
      );

      const account = await UserAccountService.delete(accountId);

      if (account) {
        request.setSuccess(200, "Conta Bancaria deletada com sucesso");
      } else request.setError("Não foi possível deletar esta Conta");

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async UpdateAccount(req,res){
    try {
      const accountId = req.dataReq.accountId;

      await UserAccountValidation.updateAccount.validate(
        { ...req.body, id: accountId },
        {
          abortEarly: false,
        }
      );

      const account = await UserAccountService.update(accountId, req.body);

      if (account) {
        request.setSuccess(200, "Conta Bancaria atualizada com sucesso", account);
      } else request.setError("Não foi possível atualizar a Conta Bancaria");
      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }


}

export default UserAccount;
