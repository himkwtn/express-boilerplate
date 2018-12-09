import { Document, Model, model, Schema } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

export interface IUser extends Document {
    username: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> {
    findByCredentials(
        username: string,
        password: string
    ): Promise<IUser | null>;
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

export const UserModel: IUserModel = model<IUser, IUserModel>(
    'User',
    UserSchema
);
