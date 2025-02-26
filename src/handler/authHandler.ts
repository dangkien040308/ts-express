import { Request, Response } from 'express'
import { CreateUserDTO } from '../dto/User.dto'
import { PrismaClient } from "@prisma/client"
import { MiddleWareController } from '../middleware/loginMiddleware'

const prisma = new PrismaClient()

const AuthHandler = {
  Register : async(req : Request<{}, {}, CreateUserDTO>, res : Response) : Promise<any> => {
    try {
      const result = await prisma.user.create({
        data : {
          username : req.body.username,
          password : req.body.password,
          email : req.body.email,
          fullname : req.body.fullname,
        }
      })
      return res.json({
        msg : 'Created Successfully',
        result
      })
    } catch (err) {
      return res.json({
        msg : 'fail',
        err
      })
    }
  },
  Login : async(req : Request<{}, {}, {username : string, password : string}>, res : Response) : Promise<any> => {
    try {
      const userIsLogin = await prisma.user.findFirst({
        where : {
          username : req.body.username
        }
      })

      if (!userIsLogin) { 
        return res.status(401).json({
          msg : 'Wrong username, please check it again',
          userIsLogin
        })
      } else {
        if(userIsLogin.password === req.body.password) {
          const token = MiddleWareController.GenerateToken(userIsLogin)
          res.cookie("token",token)
          return res.json({
            msg : 'Login Successfully',
            token,
            userIsLogin
          })
        } else {
          return res.status(401).json({
            msg : 'Wrong password, please check it again',
            userIsLogin
          })
        }
      }


    } catch(err) {
      return res.json({
        msg : 'fail',
        err
      })
    }
  },
  Logout : async (req: Request, res : Response) : Promise<any> => {

    try {
      res.clearCookie('token')
      return res.json({
        msg : 'Logout Successfully'
      })
    } catch(err) {
      console.error(err)
    }
  }
}

export { AuthHandler }