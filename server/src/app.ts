import express from "express";
import cors from "cors";

import { errorHandler } from "./middleware/error.middleware";
import routes from "./routes/api.routes";
import commentRoutes from "./routes/comment.routes";
import postLikeRoutes from "./routes/post-like.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/api", commentRoutes);
app.use("/api", postLikeRoutes);

app.use(errorHandler);

export default app;
