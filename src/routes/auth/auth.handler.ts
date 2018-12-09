import { asyncRequestHandler } from '../../decorators';
import { UserModel } from '../../models/user';

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
}
