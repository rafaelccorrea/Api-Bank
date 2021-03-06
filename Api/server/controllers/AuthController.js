import bcrypt from 'bcrypt';
import { AuthService, UserAccountService} from '../services';
import { Request, generateToken } from '../utils';
import { AuthValidation } from '../validations';

const request = new Request();
class AuthController {
  static async signin(req, res) {
    try {
      const { login, password } = req.body;

      await AuthValidation.signin.validate(
        {
          login,
        },
        { abortEarly: false }
      );

      const user = await AuthService.signin(login);

      if (user ) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          delete user.password;
          request.setSuccess(200, 'Logado com sucesso!', {
            ...user,
            token: generateToken(user),
          });

        } else {
          request.setError('Senha incorreta',404);
          return request.send(res);
        }
      } else request.setError('Nenhuma conta corresponde a esse login');
      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async signup(req, res) {
    try {
      const { password: reqPassword } = req.body;

      await AuthValidation.signup.validate(req.body, { abortEarly: false });

      const password = await bcrypt.hash(reqPassword, 10);

      const user = (await AuthService.signup({ ...req.body, password })).get({
        plain: true,
      });

      if (user) {
        delete user.password;
        request.setSuccess(200, 'Usuário cadastrado com sucesso!', {
          ...user,
          token: generateToken(user),
        });
      } else request.setError('Não foi possível cadastrar o usuário');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

}

export default AuthController;
