import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    nameCourse: {
        type: String,
        required: true
    },
    teacher: { 
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    students: [{ 
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    status: {
        type: Boolean,
        default: true
    }
}, 
{ timestamps: true, 
    versionKey: false }
);

export default model("Course", courseSchema);
