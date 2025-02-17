import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConection } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js"
import {limiter} from "../src/middlewares/validar-cant-querys.js"

const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(express.json())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(limiter)
}

const routes = (app) =>{
    app.use("/administrador_Colegio/v1/auth", authRoutes)
}

const conectDB = async() =>{
    try {
        await dbConection()
        console.log("La conexión con la base de datos ha sido exitosa")
    } catch (error) {
        console.log("Error intentando conectar con la base de datos")
        process.exit(1)
    }
}

export const initServer = async() =>{
    const app = express()
    const Port = process.env.PORT||3000
    try {
        middlewares(app)
        conectDB()
        routes(app)
        app.listen(Port)
        console.log(`Server init in port ${Port}`)
    } catch (error) {
        console.log(`Server falied init ${error}`)
    }
}