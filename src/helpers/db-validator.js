import User from "../users/user.model.js";

export const rolValido = async (role = "") =>{
    const rolExistente = await role.findOne({role})

    if(!rolExistente){
        throw new Error (`El rol ${role}, no existe en la base de Datos`)
    }
}

export const correoExiste = async (email = "") => {
    const correoExist = await User.findOne({email})

    if(correoExist){
        throw new Error (`El correo ${email} ya esta en uso`)
    }
}