import { Schema, model } from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "El nombre del Usuario es requerido"],
        maxLenght: [25, "No se pueden utilizar más de 25 caracteres"]
    },
    surname:{
        type: String, 
        required: [true, "El surname es requerido"]
    },
    email:{
        type: String,
        required: [true, "El correo es requerido"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es requerida"],
        minLenght: 8
    },
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"]
    },
    status:{
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

export default model ("User", userSchema)