import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import technologysRoutes from "./routes/technologys.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/technologys", technologysRoutes);

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
