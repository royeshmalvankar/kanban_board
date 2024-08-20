import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    task: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, enum: ["TODO", "INPROGRESS", "DONE"], required: true,
        default: "TODO",
    },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    
})

const BoardModel = mongoose.model("Board", boardSchema);

export default BoardModel