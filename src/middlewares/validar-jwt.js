import { jwt } from "jsonwebtoken";

import User from "../users/user.model.js"

export const valueJWT = async (req, res, next) =>{
    const token = req.header("x-token")

    if(!token){
        return res.status(401).json({
            msg: "No hay token para realizar la petición"
        })   
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETOPRIVATEKEY)
        const usuario = await User.findById(uid)
        if(!usuario){
            return res.status(401).json({
                msg: "El usuario no existe en la base de Datos"
            })
        }
        if(!usuario.status){
            return res.status(401).json({
                msg: "Token no valido - usuario deshabilitado: False"
            })
        }
        req.usuario = usuario
        next()
    } catch (e) {
        console.log(e)
        res.status(401).json({
            msg: "Token no valido"
        })
    }
}