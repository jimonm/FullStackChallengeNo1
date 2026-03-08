import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    JWT_SECRET
  );
};