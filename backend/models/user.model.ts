import mongoose, { Schema, Document } from 'mongoose';

// Interface for User Document
export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string; // This will store the secure hash, not the plaintext password
}

// User Schema
const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  email: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true },
}, {
  timestamps: true,
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;