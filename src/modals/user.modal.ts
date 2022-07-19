import { NextFunction } from 'express';
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';
export interface IUser {
  name: string;
  email: string;
  // Use `Types.ObjectId` in document interface...
  passwoard: string;

}
export interface UserDocument extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparedPasswoard(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  passwoard: { type: String, required: true }
}, {
  timestamps: true
})
userSchema.pre('save', async (next) => {
  let user = this as unknown as UserDocument
  if (!user.isModified('passwoard')) {
    return next()
  }
  const salt = await bcrypt.genSalt(config.get<number>('gensalt'))
  const hash = await bcrypt.hashSync(user.passwoard, salt)
  user.passwoard = hash
  return next()
})
userSchema.methods.comparedPasswoard = async (candidatePassword: string): Promise<boolean> => {
  const user = this as unknown as IUser
  return bcrypt.compare(candidatePassword, user.passwoard)
}
const UserModal = mongoose.model<UserDocument>('User', userSchema)
export default UserModal