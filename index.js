import express from "express";
import todoRoutes from "./routes/todo.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/todos", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
