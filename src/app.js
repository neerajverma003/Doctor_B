import express from "express";
import cors from "cors";
import morgan from "morgan";
import corsOptions from "./config/corsoptions.js";
import apiRoutes from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/api", apiRoutes);


app.use(notFound);
app.use(errorHandler);

export default app;