import { Document, Model, model, Schema } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

export interface IUser extends Document {
  username: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  generateToken(): string;
}

interface IUserModel extends Model<IUser> {
  findByCredentials(username: string, password: string): Promise<IUser | null>;
  findByToken(token: string): Promise<IUser | null>;
}

interface IToken {
  _id: string;
}

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  }
});

UserSchema.pre('save', async function(next) {
  const user = this as IUser;
  if (user.isModified('password')) {
    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);
  }
});

UserSchema.methods.comparePassword = async function(
  password: string
): Promise<boolean> {
  const user = this as IUser;
  return compare(password, user.password);
};

UserSchema.methods.generateToken = function(): string {
  const user = this as IUser;
  return sign({ _id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d'
  });
};

UserSchema.statics.findByCredentials = async function(
  username: string,
  password: string
): Promise<IUser | null> {
  const user = await UserModel.findOne({ username });
  if (!user) {
    return null;
  }
  return (await user.comparePassword(password)) ? user : null;
};

UserSchema.statics.findByToken = async function(token: string) {
  try {
    const decodedToken = verify(token, process.env
      .JWT_SECRET as string) as IToken;
    return UserModel.findById(decodedToken._id);
  } catch (e) {
    return null;
  }
};

export const UserModel: IUserModel = model<IUser, IUserModel>(
  'User',
  UserSchema
);
