import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message:{
        success: false,
        msg: "DEMASIADAS PETICIONES REALIZADAS DESDE LA MISMA IP, Intentenuevamente en 15 minutos"
    }
})

export default limiter;