import express from "express";
import routes from "./routes";

const app = express();
app.use(express.json());
app.use(routes);

const PORT = 9000;
export function startExpressServer() {
  app.listen(PORT, () => {
    console.log(`Listening http://localhost:${PORT}`);
  });
}
