import { Router } from 'express'
import { AuthHandler } from '../handler/authHandler'
import { MiddleWareController } from '../middleware/loginMiddleware'

const AuthRouter = Router()

AuthRouter.post('/register',AuthHandler.Register)
AuthRouter.post('/login',AuthHandler.Login)
AuthRouter.get('/isAdmin', MiddleWareController.VerifyToken, MiddleWareController.VerifyAdmin , (req, res) => {
   res.json('You are admin')
})

export { AuthRouter }