import { asyncRequestHandler, log } from '../../decorators';
import { UserModel } from '../../models/user';
import { RequestHandler } from 'express';
export class AuthHandler {
  @asyncRequestHandler
  static async signup(req, res, next) {
    const { username, password } = req.body;
    const user = await UserModel.create({
      username,
      password
    }).catch(next);
    return res.send(user.username);
  }

  @asyncRequestHandler
  static async login(req, res, next) {
    const { username, password } = req.body;
    const user = await UserModel.findByCredentials(username, password).catch(
      next
    );
    if (user) {
      return res.send(user.generateToken());
    }
    return res.status(422).send('wrong username or password');
  }

  static profile(req, res, next) {
    res.send(res.locals.user);
  }
}
