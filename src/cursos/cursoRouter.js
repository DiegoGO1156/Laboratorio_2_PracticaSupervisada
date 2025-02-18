import { Router } from "express";
import { asignCourse, crearCurso, actualizarCurso, eliminarCurso} from "./cursoController.js";
import { validarMaestro } from "../middlewares/validar-maestro";

const router = Router()

router.post(
    "/asignarCurso",
    asignCourse
)
router.post(
    "/nuevo", 
    crearCurso,
    validarMaestro 
);

router.put(
    "/:cursoId", 
    actualizarCurso,
    validarMaestro
);
router.delete( 
    "/:cursoId", 
    eliminarCurso,
    validarMaestro 
);


export default router;