import { Schema, model } from "mongoose";

const courseSchema = Schema({
    nameCourse:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
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

export default model("Course", courseSchema)