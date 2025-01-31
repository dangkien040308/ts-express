import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { CreateUserDTO, UserQueryParams } from "../dto/User.dto"

const prisma = new PrismaClient()

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
          email : req.body.email
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
  }
} 

