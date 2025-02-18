import { Router } from "express";
import { login, registerTeacher, registerUser } from "./auth.controller.js";
import { loginValidator, registerValidator } from "../middlewares/validator.js";


const router = Router()

router.post(
    "/register/User",
    registerUser,
    registerValidator
)

router.post(
    "/register/Teacher",
    registerTeacher,
    registerValidator
)

router.post(
    "/login",
    login,
    loginValidator
)

export default router