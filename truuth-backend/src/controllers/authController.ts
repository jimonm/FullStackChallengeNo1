import type { Request, Response } from "express";
import { loginUser } from "../services/authService";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser(email, password);

    res.status(200).json(data);

  } catch (error: any) {

    res.status(400).json({
      message: error.message
    });

  }
};