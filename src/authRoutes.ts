import express, { Request, Response } from "express";
import { Users } from "./entities/Users.entity"; // Corrected typo in entity import
import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const router = express.Router();
export const SECRET_KEY: Secret = "YOUR_SECRET_KEY"; // Replace with your actual secret key

router.post("/register", async (req: Request, res: Response) => {
  res.send("User registration logic goes here");
});

export default router;
