import User from "../users/user.model.js"
import Course from "./cursomodel.js"

export const getCourses = async(req,res) =>{
    try {
        const {limite = 10, desde = 0} = req.query
        const query = {status: true}
        const [total, course] = await Promise.all([
            User.countDocuments(query),
            User.find(query).skip(Number(desde)).limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            course
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            msg: "Error al buscar lo Cursos"
        })
    }
}

export const asignCourse = async(req,res) =>{
    try {
        const {courseId, studentId} = req.body

        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                msg: "Curso no encontrado"
            })
        }

        const studentCourse = await Course.countDocuments({students: studentId})
        if(studentCourse >= 3){
            res.status(400).json({
                msg: "El estudiante ya tiene el limite de cursos asignados"
            })
        }
        if (course.students.includes(studentId)) {
            return res.status(400).json({ msg: "El estudiante ya está inscrito en este curso" });
        }
        course.students.push(studentId);
        await course.save();
        res.status(200).json({
            msg: "AÑADIDO AL CURSO CON EXITO!!!"
        })

    } catch (e) {
        res.status(500).json({
            msg: "Server Eror",
            error: e.message
        })
    }
}

export const crearCurso = async (req, res) => {
    try {
        const { user } = req.body; 

        const teacher = await User.findById(user);
        if (!teacher || teacher.role !== "TEACHER_ROLE") {
            return res.status(403).json({ msg: "No tienes permisos para crear cursos." });
        }

        const nuevoCurso = new Course(req.body);
        await nuevoCurso.save();

        res.status(201).json({
            msg: "Curso creado con éxito",
            curso: nuevoCurso,
        });

    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};


export const actualizarCurso = async (req, res) => {
    try {
        const { cursoId } = req.params;
        const { user } = req.body; 

    
        const curso = await Course.findById(cursoId);
        if (!curso || curso.user.toString() !== user) {
            return res.status(403).json({ msg: "No puedes editar este curso." });
        }
        const cursoActualizado = await Course.findByIdAndUpdate(cursoId, req.body, { new: true });

        res.status(200).json({
            msg: "Curso actualizado con éxito",
            curso: cursoActualizado,
        });

    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar el curso", error });
    }
};

export const eliminarCurso = async (req, res) => {
    try {
        const { cursoId } = req.params;
        const { user } = req.body; 
        const curso = await Course.findById(cursoId);
        if (!curso || curso.user.toString() !== user) {
            return res.status(403).json({ msg: "No puedes eliminar este curso." });
        }


        await Course.findByIdAndDelete(cursoId);

        res.status(200).json({ msg: "Curso eliminado con éxito" });

    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar el curso", error });
    }
};