import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./dbs/db.js";
import userRoute from "./route/user.route.js";
import boardRoute from "./route/board.route.js";
import { verifyToken } from "./middleware/auth.middleware.js";
dotenv.config();

const app = express();

const port = process.env.PORT || 5000

app.use(cors(
    {
        origin:"*",
    }
))
app.use(express.json());
app.use("/user",userRoute)
app.use("/board",verifyToken, boardRoute)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get("/", (req, res) => {
    res.send("Hello World!");
})


app.listen(port, async() => {
    await connectDB()
    console.log(`Server running on port ${port}`)
})