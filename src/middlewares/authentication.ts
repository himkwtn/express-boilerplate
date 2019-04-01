import { UserModel } from '../models/user';

export const requiresAuthentication = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(400).send({ message: 'No header' });
  }
  if (!authHeader.includes('Bearer ')) {
    return res.status(400).send({
      message:
        'Wrong format. Header must be in the form "Authorization": "Bearer <TOKEN>" '
    });
  }
  const token = authHeader.split(' ')[1];
  const user = await UserModel.findByToken(token);
  if (!user) {
    return res.status(401).send('Invalid token');
  }
  res.locals.user = user;
  next();
};
