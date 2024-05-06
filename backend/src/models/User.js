import mongoose from "mongoose";
const { model, Schema } = mongoose;
import bcrypt from "bcrypt";
const { hash, compare } = bcrypt;

const required = true;
const unique = true;

const userSchema = new Schema(
  {
    firstname: { type: String, required },
    lastname: { type: String, required },
    email: { type: String, unique, required },
    password: { type: String, required },
  },
  { versionKey: false }
);

userSchema.statics.register = async (data) => {
  if (data.password !== data.confirmPassword) {
    throw new Error("Passwords does not match");
  }
  const hashed = await hash(data.password, 10);

  data.password = hashed;

  delete data.confirmPassword;

  return User.create(data);
};

userSchema.statics.login = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }

  //// check if password matches

  const match = await compare(password, user.password);
  if (!match) {
    return false;
  }

  return user;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = model("User", userSchema);
