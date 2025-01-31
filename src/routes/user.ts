import { Router } from "express";
import { UserHandler } from "../handler/user";

const UserRouter = Router()

UserRouter.get('/all', UserHandler.GetAllUser)
UserRouter.post('/',UserHandler.CreateUser)

export { UserRouter }