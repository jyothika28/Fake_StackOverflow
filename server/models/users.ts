import mongoose from 'mongoose';
import { IUser } from './types/types';
import UserSchema from './schema/user';

const User = mongoose.model<IUser>('User', UserSchema);

export default User;