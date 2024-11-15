import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// routes import
import serviceRoutes from "./routes/service.routes.js"

//routes declaration
app.use("/api/services", serviceRoutes)


export { app }