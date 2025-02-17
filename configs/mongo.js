"use strict"

import mongoose from "mongoose"

export const dbConection = async () =>{
    try {
         //Metodo de escucha para poder ver si hay un error al conectar con la base de datos
         mongoose.connection.on('error',()=>{
            console.log("MongoDB error | error conection to MongoDB")
            mongoose.disconnect()//Desconecta la DB si hay error
        })
        //Metodo de escucha para poder ver si esta conectando con la base de datos
        mongoose.connection.on('connecting', ()=>{
            console.log("MongoDB Connection | Trying to connect to MongoDB")//Mensaje para indicar que esta intentando conectar
        })
        //Metodo de escucha para poder ver si la base de Datos esta conectada
        mongoose.connection.on('connected', ()=>{
            console.log("Mongo DB | Connected to MongoDB")//Mensaje cuando este conectada la base de datos
        })
        //Metodo de reconección para ver si se intenta hacer conexion con la base de Datos
        mongoose.connection.on('reconnected', ()=>{
            console.log("Mongo DB | reconnected to MongoDB")//Mensaje para indicar cuando se este intentando reconectar a la base de Datos
        })
        //Metodo para escuchar cuando se desconecte con la base de Datos
        mongoose.connection.on('disconnected', ()=>{
            console.log("Mongo DB | disconnected")//Mensaje para indicar cuando se desconecte la DB
        })

        mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,
        });

    } catch (err) {
        console.error(err)
    }
}