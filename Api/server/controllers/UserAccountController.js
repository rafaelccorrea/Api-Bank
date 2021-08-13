import { UserAccountService } from '../services';
import { Request } from '../utils';
import { UserAccountValidation}  from '../Validations'

const request = new Request();

class UserAccount {

  static async CreateAccount(req,res){

    try{

      await UserAccountValidation.UserAccount.validate(req.body, { abortEarly: false })

      const userId =  req.dataReq;

      const existAccount = await UserAccountService.getAccountById(userId)

      if(existAccount) {
        request.setSuccess(200, 'Este usuário já tem Conta Bancaria cadastrada')
        return request.send(res);
      }

      const account = await UserAccountService.CreateAccount(userId,{
        ...req.body,
        userId: req.dataReq.id,
        legal_name: req.dataReq.name,
        bank_code: '345'
      })

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
      await UserAccountValidation.getAccountById.validate(
        {
          id: req.params.id,
        },
        { abortEarly: false }
      );

      const account = await UserAccountService.getById(req.params.id);

      if (account) { request.setSuccess(200, 'Conta Bancaria consultada com sucesso', account); } else request.setError('Conta Bancaria inexistente', 400);

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
      const { id: accountId } = req.params;

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
      const { id: accountId } = req.params;

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
