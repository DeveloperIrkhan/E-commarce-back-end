import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/database.js";
import authRoutes from "./routers/authroute.js";
import cors from "cors";
import categoryroute from "./routers/categoryroute.js";

//configuring env
dotenv.config();

// dabaseconnectiong

connectDb();
//assigning port no
const port = process.env.PORT || 8080;
//rest api object calling
const app = express();
//enableing cors for our react app.
app.use(cors());
//middlewares
app.use(express.json());
app.use(morgan("dev"));
//routes for auth
app.use("/auth", authRoutes);

//routes for category 
app.use("/category", categoryroute);

app.get("/", (req, resp) => {
  resp.send({ message: "hi, this is MERN e-commerce website" });
});
app.listen(port, () => {
  console.log(`application is running on localhost:${port}`.bgCyan.white);
});
