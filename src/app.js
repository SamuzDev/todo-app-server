import { connectToDatabase } from "./config/mongo.js";
import taskRoutes from "./modules/tasks/index.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
const port = process.env.PORT ?? 3000

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Hello World");
});

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch((error) => {
    console.log(error)
});

app.use("/tasks", taskRoutes)