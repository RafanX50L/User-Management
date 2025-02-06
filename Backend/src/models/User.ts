import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { timeStamp } from 'console';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  location: string,
  phone: number,
  occupation: string,
  bio: string,
  profilePicture:string,
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type:String },
  phone: { type:Number },
  occupation: { type:String },
  bio: { type:String },
  profilePicture: { type: String, default: "" },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
},{timestamps:true});

// Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);