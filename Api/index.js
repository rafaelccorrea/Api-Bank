import config from "dotenv";
import express from "express";
import cors from "cors";
import {
  AuthRoutes,
  UserAccountRoutes
} from "./server/routes";
import {
  TokenMiddleware
} from './server/middlewares';

config.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to this API.",
  })
);

// app.use('/api/*', TokenMiddleware);
app.use("/", AuthRoutes);
app.use("/api", UserAccountRoutes);


app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
