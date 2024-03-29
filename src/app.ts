import express, { Application } from "express";
import cors from "cors";
import { userRoute } from "./app/modules/user/user.route";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import { authRoute } from "./app/modules/auth/auth.router";
import cookieParser from "cookie-parser"
const app: Application = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())
// user Route
app.use("/api", userRoute);
app.use("/api",authRoute);


app.get("/", async (req, res) => {
  res.send("hello");
});

app.use(globalErrorHandler);
app.use(notFound)
export default app;
