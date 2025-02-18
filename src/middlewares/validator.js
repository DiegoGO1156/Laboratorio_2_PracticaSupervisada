import { body } from "express-validator";
import { validarCampos } from "./validarCampos.js";
import { correoExiste, rolValido } from "../helpers/db-validator.js";

export const registerValidator = [
    body("name", "The name is required").not().isEmpty(),
    body("surname", "The surname is required").not().isEmpty(),
    body("email","Debe ingresar un correo valido").isEmail(),
    body("email").custom(correoExiste),
    body("role").custom(rolValido),
    body("password","La contraseña debe de tener un minimo de 8 caracteres").isLength({min: 8}),
    validarCampos
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Ingresa una dirección de correo valida"),
    body("name").optional().isString().withMessage("Ingresa un username valido"),
    body("password", "La contraseña debe tener minimo 8 caracteres").isLength({min: 8}),
    validarCampos
]