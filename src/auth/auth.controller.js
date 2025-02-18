import { hash, verify } from "argon2";
import User from "../users/user.model.js";
import { generarJWT } from "../helpers/generate-jwt.js";

export const registerUser = async (req, res) =>{
    console.log("Hola")
    try {
        const data = req.body
        const passwordEncrypt = await hash(data.password)

        let role = data.role

        if(!role || role !== "TEACHER_ROLE"){
            role = "STUDENT_ROLE"
        }

        if(role == "TEACHER_ROLE"){
            res.status(400).json({
                msg: "El único role admitido es STUDENT_ROLE"
            })
        }

        const user = await User.create({
            name: data.name,
            surname: data.surname, 
            email: data.email,
            password: passwordEncrypt,
            role: role
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

export const registerTeacher = async (req, res) =>{
    try {
        const data = req.body
        const passwordEncrypt = await hash(data.password)

        let role = data.role

        if(role !== "TEACHER_ROLE"){
            res.status(400).json({
                msg: "El único role admitido es TEACHER_ROLE"
            })
        }

        const user = await User.create({
            name: data.name,
            surname: data.surname, 
            email: data.email,
            password: passwordEncrypt,
            role: role
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

export const login = async (req, res) =>{
    const {email, password, name} = req.body;
 
    try {
        const lowerEmail = email ? email.toLowerCase() : null;
        const lowerName = name ? name.toLowerCase() : null;

        const user = await User.findOne({
            $or: [{email: lowerEmail}, {name: lowerName}]
        })

        if (!user) {
            return res.status(400).json({
                msg: 'Credenciales incorrectas, Correo no existe en la base de datos'
            });
        }
        if (!user.status) {
            return res.status(400).json({
                msg: 'El user no existe en la base de datos'
            });
        }
        const validPassword = await verify(user.password, password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            })
        }
        console.log("Hola")
        const token = await generarJWT(user.id);
 
        res.status(200).json({
            msg: "Inicio de sesión exitoso!!!",
            userDetails: {
                surname: user.name,
                token: token
            }
        })
 
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Server error",
            error: e.message
        });
    }
}