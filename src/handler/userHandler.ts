import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { CreateUserDTO, UserQueryParams } from "../dto/User.dto"
import dotenv from "dotenv"
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

dotenv.config()
const SECRET_KEY = process.env.TOKEN || '123@abc'
export const UserHandler = {
  GetAllUser : async(req : Request, res : Response) : Promise<any> => {
     try {
      const allUser = await prisma.user.findMany()
      return res.json({
        msg : 'Request Successfully',
        data : allUser
      })
     } catch(err) {
      console.log(err)
     }
  },
  CreateUser : async(
    req : Request<{id? : string}, {}, CreateUserDTO, UserQueryParams>, 
    res : Response
  ) : Promise<any> => {
    try {
      const result = await prisma.user.create({
        data : {
          username : req.body.username,
          fullname : req.body.fullname,
          password : req.body.password,
          email : req.body.email,
          isAdmin : req.body.isAdmin
        }
      })
      return res.json({
        msg : 'Created Successfully',
        result,
        query : req.query.loginAfterCreate,
        params : req.params.id
      })
    } 
    catch(err) {
      return res.json({
        msg : 'Created Fail',
        err
      })
    }
  },
  UpdateUser : async(req : Request<{id? : string}>, res : Response) : Promise<any> => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Missing user ID" });
      }
      const allowedFields = ["username","fullname","password","email","isAdmin"]
      const updateData : Record<string,any> = {}
      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field]
        }
      })
      if(Object.keys(updateData).length === 0) {
        return res.status(400).json({msg : "No data to update"})
      }
      
      const result = await prisma.user.update({
        where: {
          id : Number(id),
        },
        data : updateData
      })
      
      return res.json({
        msg : 'Update Successfully',
        result
      })
    } catch(err) {
      console.error(err)
    }
  },
  DeleteUser : async(req : Request<{id? : string}>, res : Response) : Promise<any> => {
    try {
      const result = await prisma.user.delete({
        where : {
          id : Number(req.params.id)
        }
      })
    } catch (err) {
      console.error(err)
    }
  },
  GetCurrentUser : async (req: Request, res : Response) : Promise<any> => {
    try {
      const token = req.headers.authorization?.split(" ")[1] || req.headers.authorization?.split(" ")[0] || ''; // Lấy token từ header
      const data = jwt.verify(token,SECRET_KEY,(err, user) => {
        if (err) {
          return res.status(401).json({
            msg : 'Something went wrong'
          })
        }
        if (user) {
          return res.json({
            msg : 'Get user successfully',
            data : user
          })
        }
      })
    }
    catch (err) {
      console.log(err)
    }
  }
} 

