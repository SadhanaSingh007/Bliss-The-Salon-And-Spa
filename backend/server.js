import express from "express";
import { config } from "dotenv";
import connectDB from "./lib/database.js";
import serviceRouter from "./src/router/serviceRouter.js";
import productRouter from "./src/router/productRouter.js";
import cors from "cors";
import appointmentRouter from "./src/router/appointmentRouter.js";
import cartRouter from "./src/router/cartRouter.js";
import { authRouter } from "./src/router/authRouter.js";

const app = express();
config();
app.use(express.json());
connectDB();
app.use(cors());
const port = process.env.PORT || 3020;
app.use("/uploads", express.static("uploads"));

app.use("/services", serviceRouter);
app.use("/products", productRouter);
app.use("/appointments", appointmentRouter);
app.use("/carts", cartRouter);
app.use("/auth", authRouter);

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ error: err.message || "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`[SERVER] running on http://localhost:${port}`);
});
