import express from "express";
import authRoutes from "./modules/auth/auth.routes.js"
import projectRoutes from "./modules/projects/projects.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";



const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
})
app.use(errorHandler)
export default app;