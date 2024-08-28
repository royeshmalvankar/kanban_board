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
app.use(express.json());
const port = process.env.PORT || 5000

app.use(cors(
    {
        origin:"*",
    }
))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :remote-user [:date[clf]]'));
app.use("/user",userRoute)
app.use("/board",verifyToken, boardRoute)


app.get("/", (req, res) => {
    res.type("application/javascript");
    res.send("Hello World!");
})


app.listen(port, async() => {
    await connectDB()
    console.log(`Server running on port ${port}`)
})