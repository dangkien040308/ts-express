import { Router } from "express";
import { UserHandler } from "../handler/userHandler";
import { MiddleWareController } from "../middleware/loginMiddleware";

const UserRouter = Router()

UserRouter.get('/all', UserHandler.GetAllUser)
UserRouter.get('/current', MiddleWareController.VerifyToken ,UserHandler.GetCurrentUser)
UserRouter.post('/',UserHandler.CreateUser)
UserRouter.patch('/update/:id',UserHandler.UpdateUser)
UserRouter.delete('/delete/:id',UserHandler.DeleteUser)


export { UserRouter }