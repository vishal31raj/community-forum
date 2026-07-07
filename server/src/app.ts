import express from "express";
import cors from "cors";

import { errorHandler } from "./middleware/error.middleware";
import routes from "./routes/api.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

export default app;
