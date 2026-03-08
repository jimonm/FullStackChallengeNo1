import prisma from "../config/db";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export const loginUser = async (email: string, password: string) => {

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      company: user.company
    }
  };
};