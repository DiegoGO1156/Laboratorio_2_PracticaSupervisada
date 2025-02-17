import { hash, verify } from "argon2";
import User from "../users/user.model.js";
import { generarJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) =>{
    try {
        const data = req.body
        const passwordEncrypt = await hash(data.password)

        const user = await User.create({
            name: data.name,
            surname: data.surname, 
            email: data.email,
            password: passwordEncrypt,
            role: data.role
        })
        return res.status(200).json({
            msg: "Registro hecho con Exito!!!",
            userDetails:{
                user: user.email
            }
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: "User registration falied in the process",
            error: e.message
        })
    }
}