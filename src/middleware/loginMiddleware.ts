import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

import dotenv from "dotenv"
import { CreateUserDTO } from "../dto/User.dto"

interface UserLogin extends CreateUserDTO {
  id : string
}
interface AuthRequest extends Request {
  user? : UserLogin
}

dotenv.config()
const SECRET = process.env.TOKEN || '123@abc'
const MiddleWareController = {
    VerifyToken : (req : AuthRequest, res : Response, next : NextFunction) : void => {

      const token = req.headers.authorization?.split(" ")[1] || req.headers.authorization?.split(" ")[0]; // Lấy token từ header

      if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
      }

      jwt.verify(token,SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
        (req as any).user = user; // Gán user vào request để sử dụng ở các route sau
        next();
      })

    },
    VerifyAdmin : (req : AuthRequest, res : Response, next : NextFunction) : void => {
      if (!req.user) {
       res.status(401).json({ message: "Unauthorized: No user data" });
       return;
      }
    
      if (!req.user.isAdmin) {
        res.status(403).json({ message: "Forbidden: Admin only" });
        return;
      }
    
      next(); // Cho phép tiếp tục nếu là admin
    },
    GenerateToken : (data : CreateUserDTO) => {
      return jwt.sign(data, SECRET,{ expiresIn : '1d'})
    },
    GenerateAccessToken : (data: CreateUserDTO) => {
      return jwt.sign(data, SECRET,{ expiresIn : '365d'})
    },
}

export  { MiddleWareController }