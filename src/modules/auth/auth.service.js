import User from "../users/user.model.js";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import AppError from "../../utils/AppError.js";

export const registerUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already in use", 409);
  }

  const user = await User.create({ email, password });
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

  return { user, token };
};
